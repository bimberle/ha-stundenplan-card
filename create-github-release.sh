#!/bin/bash

# 🚀 GitHub Release Creator via API
# Erstellt automatisch einen GitHub Release über die GitHub API

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
echo "║      🚀 GitHub Release API Creator            ║"
echo "║         Automatischer Release Upload          ║"
echo "╚═══════════════════════════════════════════════╝"
echo -e "${NC}"

# Repository Info
REPO_OWNER="bimberle"
REPO_NAME="ha-stundenplan-card"
TAG_NAME="v1.0.2"
RELEASE_NAME="🕐 Stundenplan Card v1.0.2"
ASSET_FILE="ha-stundenplan-card.js"

# Prüfe ob Asset-Datei existiert
if [ ! -f "$ASSET_FILE" ]; then
    log_error "Asset-Datei '$ASSET_FILE' nicht gefunden!"
    exit 1
fi

log_info "Repository: $REPO_OWNER/$REPO_NAME"
log_info "Tag: $TAG_NAME"
log_info "Asset: $ASSET_FILE ($(wc -c < $ASSET_FILE) bytes)"

# Release Beschreibung
RELEASE_BODY="## 🕐 Stundenplan Card - HACS Ready!

✨ **Erste HACS-kompatible Version**

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
5. Füge die Card zu deinem Dashboard hinzu

### Konfiguration
\`\`\`yaml
type: custom:ha-stundenplan-card
server: \"https://ihr-stundenplan-server.de\"
username: \"ihr-benutzername\"
password: \"ihr-passwort\"
height: 400
\`\`\`

### Server API Format
\`\`\`json
[
  {
    \"time\": \"08:00 - 09:30\",
    \"subject\": \"Mathematik\", 
    \"room\": \"A101\"
  }
]
\`\`\`

---
**Dateigröße:** $(wc -c < $ASSET_FILE) bytes  
**HACS-kompatibel** ✅  
**Auto-Release** 🤖"

# GitHub Personal Access Token prüfen
if [ -z "$GITHUB_TOKEN" ]; then
    log_warning "GITHUB_TOKEN Umgebungsvariable nicht gesetzt"
    echo ""
    echo "🔑 GitHub Personal Access Token benötigt:"
    echo "1. Gehe zu: https://github.com/settings/tokens"
    echo "2. Generate new token (classic)"
    echo "3. Scopes: repo, write:packages"
    echo "4. Kopiere den Token"
    echo ""
    read -p "🔑 GitHub Token eingeben (wird nicht gespeichert): " -s GITHUB_TOKEN
    echo ""
    
    if [ -z "$GITHUB_TOKEN" ]; then
        log_error "Token erforderlich für API-Zugriff"
        exit 1
    fi
fi

log_info "GitHub Token bereit"

# 1. Prüfe ob Release bereits existiert
log_info "Prüfe ob Release bereits existiert..."

EXISTING_RELEASE=$(curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/tags/$TAG_NAME" \
  | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2 2>/dev/null || echo "")

if [ -n "$EXISTING_RELEASE" ]; then
    log_warning "Release $TAG_NAME existiert bereits (ID: $EXISTING_RELEASE)"
    read -p "🤔 Überschreiben? (y/n): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Lösche existierenden Release..."
        curl -s -X DELETE \
          -H "Authorization: token $GITHUB_TOKEN" \
          -H "Accept: application/vnd.github.v3+json" \
          "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/$EXISTING_RELEASE"
        log_success "Existierender Release gelöscht"
    else
        log_info "Abgebrochen"
        exit 0
    fi
fi

# 2. Erstelle Release
log_info "Erstelle GitHub Release..."

RELEASE_DATA="{
  \"tag_name\": \"$TAG_NAME\",
  \"target_commitish\": \"main\",
  \"name\": \"$RELEASE_NAME\",
  \"body\": $(echo "$RELEASE_BODY" | jq -Rs .),
  \"draft\": false,
  \"prerelease\": false
}"

RELEASE_RESPONSE=$(curl -s \
  -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  -d "$RELEASE_DATA" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases")

# Extrahiere Release-ID und Upload-URL
RELEASE_ID=$(echo "$RELEASE_RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
UPLOAD_URL=$(echo "$RELEASE_RESPONSE" | grep -o '"upload_url":"[^"]*' | cut -d'"' -f4 | sed 's/{?name,label}//')

if [ -z "$RELEASE_ID" ]; then
    log_error "Fehler beim Erstellen des Release"
    echo "API Response: $RELEASE_RESPONSE"
    exit 1
fi

log_success "Release erstellt (ID: $RELEASE_ID)"

# 3. Lade Asset hoch
log_info "Lade Asset '$ASSET_FILE' hoch..."

ASSET_RESPONSE=$(curl -s \
  -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/javascript" \
  --data-binary @"$ASSET_FILE" \
  "$UPLOAD_URL?name=$ASSET_FILE")

ASSET_ID=$(echo "$ASSET_RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)

if [ -n "$ASSET_ID" ]; then
    log_success "Asset hochgeladen (ID: $ASSET_ID)"
else
    log_warning "Asset-Upload möglicherweise fehlgeschlagen"
fi

# 4. Erfolgsmeldung
echo ""
echo -e "${GREEN}🎉 GITHUB RELEASE ERFOLGREICH ERSTELLT! 🎉${NC}"
echo ""
echo "📦 Release: $RELEASE_NAME"
echo "🔗 URL: https://github.com/$REPO_OWNER/$REPO_NAME/releases/tag/$TAG_NAME"
echo "📁 Asset: $ASSET_FILE"
echo ""
echo "📋 Nächste Schritte:"
echo "1. ⏰ Warte 10-15 Minuten (HACS-Cache)"
echo "2. 🔄 Gehe zu HACS → Frontend"
echo "3. 🔍 Suche nach 'Stundenplan Card'"
echo "4. 📦 Installiere die Card über HACS"
echo ""
log_success "Release-Prozess abgeschlossen!"