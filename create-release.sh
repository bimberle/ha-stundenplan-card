#!/bin/bash

# 🚀 GitHub Release Creator für HACS
# Erstellt einen Release über die GitHub Web-API

set -e

# Farben
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

echo "🚀 GitHub Release für HACS erstellen"
echo "==================================="

# Prüfe ob ha-stundenplan-card.js existiert
if [ ! -f "ha-stundenplan-card.js" ]; then
    echo "❌ ha-stundenplan-card.js nicht gefunden!"
    echo "Führe zuerst ./deploy.sh aus"
    exit 1
fi

# Lese Version aus hacs.json oder package.json
VERSION="v1.0.2"
if command -v jq &> /dev/null; then
    if [ -f "package.json" ]; then
        VERSION="v$(jq -r '.version' package.json)"
    fi
fi

log_info "Version: $VERSION"
log_info "Repository: https://github.com/bimberle/ha-stundenplan-card"

# Release-Beschreibung
RELEASE_DESCRIPTION="## 🕐 Stundenplan Card $VERSION

### ✨ Features
- 🎨 Konfigurierbare Stundenplan-Anzeige für Home Assistant
- ⚙️ Grafischer Editor für einfache Konfiguration  
- 🔐 Sichere HTTP Basic Authentication
- 📏 Anpassbare Card-Höhe (Standard: 400px)
- 📱 Responsive Design mit Home Assistant Themes

### 📦 Installation über HACS
1. Füge \`https://github.com/bimberle/ha-stundenplan-card\` als Custom Repository zu HACS hinzu
2. Wähle **Lovelace** als Kategorie
3. Installiere \"Stundenplan Card\" über HACS
4. Starte Home Assistant neu
5. Füge die Card zu deinem Dashboard hinzu

### ⚙️ Konfiguration
\`\`\`yaml
type: custom:ha-stundenplan-card
server: \"https://ihr-stundenplan-server.de\"
username: \"ihr-benutzername\"
password: \"ihr-passwort\"
height: 400
\`\`\`

### 📊 Server API Format
Die Card erwartet einen \`/api/stundenplan\` Endpunkt mit JSON:
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
**Dateigröße:** $(wc -c < ha-stundenplan-card.js) bytes  
**Für HACS optimiert** ✅"

echo ""
log_info "📋 Nächste Schritte zum Erstellen des GitHub Release:"
echo ""
echo "1. 🌐 Gehe zu: https://github.com/bimberle/ha-stundenplan-card/releases"
echo "2. 🆕 Klicke \"Create a new release\""
echo "3. 🏷️  Tag: $VERSION"
echo "4. 📝 Title: 🕐 Stundenplan Card $VERSION - HACS Ready"
echo "5. 📄 Description:"
echo "────────────────────────────────────────────────────────────"
echo "$RELEASE_DESCRIPTION"
echo "────────────────────────────────────────────────────────────"
echo "6. 📎 Asset hochladen: ha-stundenplan-card.js"
echo "7. ✅ \"Publish release\" klicken"
echo ""
log_success "Nach dem Release sollte die Card in HACS erscheinen!"

# Öffne GitHub Release Seite (falls möglich)
if command -v open &> /dev/null; then
    read -p "🌐 GitHub Release-Seite öffnen? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open "https://github.com/bimberle/ha-stundenplan-card/releases/new?tag=$VERSION"
        log_success "GitHub Release-Seite geöffnet!"
    fi
fi