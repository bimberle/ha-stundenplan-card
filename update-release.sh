#!/bin/bash

# 🚀 GitHub Release Updater - Fügt Assets zu existierendem Release hinzu

set -e

# Farben
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════╗"
echo "║     🔄 GitHub Release Asset Updater           ║"
echo "║        Fügt Asset zu existierendem Release    ║"
echo "╚═══════════════════════════════════════════════╝"
echo -e "${NC}"

# Repository Info
REPO_OWNER="bimberle"
REPO_NAME="ha-stundenplan-card"
TAG_NAME="v1.0.2"
ASSET_FILE="ha-stundenplan-card.js"

# Prüfe ob Asset-Datei existiert
if [ ! -f "$ASSET_FILE" ]; then
    log_error "Asset-Datei '$ASSET_FILE' nicht gefunden!"
    exit 1
fi

log_info "Repository: $REPO_OWNER/$REPO_NAME"
log_info "Tag: $TAG_NAME"
log_info "Asset: $ASSET_FILE ($(wc -c < $ASSET_FILE) bytes)"

# GitHub Token
if [ -z "$GITHUB_TOKEN" ]; then
    echo ""
    echo "🔑 GitHub Personal Access Token benötigt:"
    echo "1. https://github.com/settings/tokens"
    echo "2. Generate new token (classic)"
    echo "3. Scopes: repo"
    echo ""
    read -p "🔑 Token eingeben: " -s GITHUB_TOKEN
    echo ""
fi

# 1. Hole existierenden Release
log_info "Suche existierenden Release..."

RELEASE_INFO=$(curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/tags/$TAG_NAME")

RELEASE_ID=$(echo "$RELEASE_INFO" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
UPLOAD_URL=$(echo "$RELEASE_INFO" | grep -o '"upload_url":"[^"]*' | cut -d'"' -f4 | sed 's/{?name,label}//')

if [ -z "$RELEASE_ID" ]; then
    log_error "Release $TAG_NAME nicht gefunden!"
    echo "Verfügbare Releases:"
    curl -s \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Accept: application/vnd.github.v3+json" \
      "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases" \
      | grep -o '"tag_name":"[^"]*' | cut -d'"' -f4
    exit 1
fi

log_success "Release gefunden (ID: $RELEASE_ID)"

# 2. Prüfe existierende Assets
log_info "Prüfe existierende Assets..."

EXISTING_ASSETS=$(curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/$RELEASE_ID/assets")

# Lösche existierendes Asset falls vorhanden
EXISTING_ASSET_ID=$(echo "$EXISTING_ASSETS" | grep -B5 -A5 "\"name\": *\"$ASSET_FILE\"" | grep -o '"id":[0-9]*' | cut -d':' -f2)

if [ -n "$EXISTING_ASSET_ID" ]; then
    log_warning "Asset '$ASSET_FILE' existiert bereits (ID: $EXISTING_ASSET_ID)"
    log_info "Lösche existierendes Asset..."
    
    curl -s -X DELETE \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Accept: application/vnd.github.v3+json" \
      "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/assets/$EXISTING_ASSET_ID"
    
    log_success "Existierendes Asset gelöscht"
fi

# 3. Lade neues Asset hoch
log_info "Lade Asset '$ASSET_FILE' hoch..."

ASSET_RESPONSE=$(curl -s \
  -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/javascript" \
  --data-binary @"$ASSET_FILE" \
  "$UPLOAD_URL?name=$ASSET_FILE&label=Home%20Assistant%20Stundenplan%20Card")

# Prüfe Upload-Erfolg
NEW_ASSET_ID=$(echo "$ASSET_RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
DOWNLOAD_URL=$(echo "$ASSET_RESPONSE" | grep -o '"browser_download_url":"[^"]*' | cut -d'"' -f4)

if [ -n "$NEW_ASSET_ID" ]; then
    log_success "Asset erfolgreich hochgeladen!"
    log_info "Asset-ID: $NEW_ASSET_ID"
    log_info "Download-URL: $DOWNLOAD_URL"
else
    log_error "Asset-Upload fehlgeschlagen"
    echo "API Response: $ASSET_RESPONSE"
    exit 1
fi

# 4. Aktualisiere Release-Beschreibung
log_info "Aktualisiere Release-Beschreibung..."

UPDATED_BODY="## 🕐 Stundenplan Card v1.0.2 - HACS Ready!

✨ **HACS-kompatible Version mit Asset**

### Features
- 🎨 Konfigurierbare Stundenplan-Anzeige für Home Assistant
- ⚙️ Grafischer Editor für einfache Konfiguration  
- 🔐 Sichere HTTP Basic Authentication
- 📏 Anpassbare Card-Höhe (Standard: 400px)
- 📱 Responsive Design mit Home Assistant Themes

### Installation über HACS
1. Füge \`https://github.com/$REPO_OWNER/$REPO_NAME\` als Custom Repository zu HACS hinzu
2. Wähle **Lovelace** als Kategorie
3. Installiere \"Stundenplan Card\" über HACS
4. Starte Home Assistant neu

### Manuelle Installation
1. Lade \`ha-stundenplan-card.js\` herunter
2. Kopiere nach \`/config/www/\`  
3. Füge als Resource hinzu: \`/local/ha-stundenplan-card.js\`

### Konfiguration
\`\`\`yaml
type: custom:ha-stundenplan-card
server: \"https://ihr-stundenplan-server.de\"
username: \"ihr-benutzername\"
password: \"ihr-passwort\"
height: 400
\`\`\`

---
**Dateigröße:** $(wc -c < $ASSET_FILE) bytes | **HACS-Ready** ✅"

UPDATE_DATA="{
  \"tag_name\": \"$TAG_NAME\",
  \"name\": \"🕐 Stundenplan Card $TAG_NAME - HACS Ready\",
  \"body\": $(echo "$UPDATED_BODY" | jq -Rs .)
}"

curl -s -X PATCH \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  -d "$UPDATE_DATA" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/$RELEASE_ID" > /dev/null

log_success "Release-Beschreibung aktualisiert"

# 5. Erfolgsmeldung
echo ""
echo -e "${GREEN}🎉 GITHUB RELEASE ERFOLGREICH AKTUALISIERT! 🎉${NC}"
echo ""
echo "📦 Release: https://github.com/$REPO_OWNER/$REPO_NAME/releases/tag/$TAG_NAME"
echo "📁 Asset: $ASSET_FILE ($(wc -c < $ASSET_FILE) bytes)"
echo "📥 Download: $DOWNLOAD_URL"
echo ""
echo "📋 Nächste Schritte für HACS:"
echo "1. ⏰ Warte 5-10 Minuten (HACS-Cache Update)"
echo "2. 🔄 Entferne Repository aus HACS (falls bereits hinzugefügt)"
echo "3. ➕ Füge Repository erneut hinzu"
echo "4. 🔍 Suche nach 'Stundenplan Card'"
echo "5. 📦 Installiere über HACS"
echo ""
log_success "Release ist jetzt HACS-bereit!"