#!/bin/bash

# 🔍 HACS Troubleshooting & Validation Script
# Prüft ob das Repository HACS-konform ist

set -e

# Farben
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════╗"
echo "║           🔍 HACS Troubleshooting              ║"
echo "║         Repository Validation Check            ║"
echo "╚════════════════════════════════════════════════╝"
echo -e "${NC}"

# 1. Prüfe grundlegende Dateien
log_info "1️⃣ Prüfe grundlegende HACS-Dateien..."

if [ -f "hacs.json" ]; then
    log_success "hacs.json gefunden"
else
    log_error "hacs.json fehlt!"
    exit 1
fi

if [ -f "ha-stundenplan-card.js" ]; then
    log_success "ha-stundenplan-card.js im Root gefunden"
    FILE_SIZE=$(wc -c < "ha-stundenplan-card.js")
    log_info "Dateigröße: $FILE_SIZE bytes"
else
    log_error "ha-stundenplan-card.js im Root fehlt!"
    exit 1
fi

if [ -f "README.md" ]; then
    log_success "README.md gefunden"
else
    log_warning "README.md fehlt (empfohlen)"
fi

# 2. Validiere hacs.json
log_info "2️⃣ Validiere hacs.json Inhalt..."

if command -v jq &> /dev/null; then
    # JSON Syntax prüfen
    if jq empty hacs.json 2>/dev/null; then
        log_success "hacs.json ist valides JSON"
    else
        log_error "hacs.json enthält Syntax-Fehler!"
        exit 1
    fi
    
    # Pflichtfelder prüfen
    NAME=$(jq -r '.name // empty' hacs.json)
    FILENAME=$(jq -r '.filename // empty' hacs.json)
    
    if [ -n "$NAME" ]; then
        log_success "name: '$NAME'"
    else
        log_error "name fehlt in hacs.json"
    fi
    
    if [ -n "$FILENAME" ]; then
        log_success "filename: '$FILENAME'"
        
        # Prüfe ob Datei existiert
        if [ -f "$FILENAME" ]; then
            log_success "Referenzierte Datei '$FILENAME' existiert"
        else
            log_error "Referenzierte Datei '$FILENAME' nicht gefunden!"
        fi
    else
        log_error "filename fehlt in hacs.json"
    fi
else
    log_warning "jq nicht installiert, kann JSON nicht validieren"
fi

# 3. Prüfe Git Repository Status
log_info "3️⃣ Prüfe Git Repository..."

if [ -d ".git" ]; then
    log_success "Git Repository gefunden"
    
    # Remote URL prüfen
    if git remote get-url origin &>/dev/null; then
        REMOTE_URL=$(git remote get-url origin)
        log_success "Remote URL: $REMOTE_URL"
        
        # Prüfe ob URL GitHub ist
        if echo "$REMOTE_URL" | grep -q "github.com"; then
            log_success "GitHub Repository erkannt"
        else
            log_warning "Kein GitHub Repository - HACS unterstützt nur GitHub"
        fi
    else
        log_error "Kein Git Remote konfiguriert!"
    fi
    
    # Prüfe Branch
    CURRENT_BRANCH=$(git branch --show-current)
    log_info "Aktueller Branch: $CURRENT_BRANCH"
    
    # Prüfe Tags
    TAG_COUNT=$(git tag | wc -l)
    if [ "$TAG_COUNT" -gt 0 ]; then
        LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "keine")
        log_success "$TAG_COUNT Tag(s) gefunden, neuester: $LATEST_TAG"
    else
        log_warning "Keine Git Tags gefunden"
    fi
else
    log_error "Kein Git Repository!"
    exit 1
fi

# 4. HACS-spezifische Prüfungen
log_info "4️⃣ HACS-spezifische Validierung..."

# Prüfe auf häufige Probleme
if [ -f "hacs.json" ]; then
    if grep -q "content_in_root" hacs.json; then
        log_warning "content_in_root gefunden - oft nicht nötig für Frontend"
    fi
    
    if grep -q "zip_release" hacs.json; then
        log_info "zip_release konfiguriert"
    fi
fi

# 5. Erstelle Diagnose-Report
log_info "5️⃣ Erstelle Diagnose-Report..."

echo ""
echo "════════════════════════════════════════════════"
echo "📊 HACS DIAGNOSE REPORT"
echo "════════════════════════════════════════════════"
echo "Repository: $(git remote get-url origin 2>/dev/null || echo 'Nicht konfiguriert')"
echo "Branch: $(git branch --show-current 2>/dev/null || echo 'Unbekannt')"
echo "Tags: $(git tag | wc -l) (neuester: $(git describe --tags --abbrev=0 2>/dev/null || echo 'keine'))"
echo "hacs.json: $([ -f hacs.json ] && echo '✅' || echo '❌')"
echo "Card-Datei: $([ -f ha-stundenplan-card.js ] && echo "✅ ($(wc -c < ha-stundenplan-card.js) bytes)" || echo '❌')"
echo "README.md: $([ -f README.md ] && echo '✅' || echo '❌')"
echo ""

# 6. Lösungsvorschläge
log_info "6️⃣ Mögliche Lösungen..."

echo ""
echo "🔧 LÖSUNGSVORSCHLÄGE:"
echo ""
echo "1️⃣ GitHub Release erstellen (WICHTIGSTER SCHRITT):"
echo "   - Gehe zu: $(git remote get-url origin 2>/dev/null || echo 'GitHub-Repository')/releases"
echo "   - Create new release mit Tag v1.0.2"
echo "   - Lade ha-stundenplan-card.js als Asset hoch"
echo ""
echo "2️⃣ Repository in HACS neu hinzufügen:"
echo "   - Entferne das Repository aus HACS"
echo "   - Warte 5 Minuten"
echo "   - Füge es erneut als Custom Repository hinzu"
echo "   - Kategorie: Lovelace"
echo ""
echo "3️⃣ HACS Debug aktivieren:"
echo "   - Gehe zu Home Assistant Logs"
echo "   - Suche nach 'hacs' Fehlermeldungen"
echo ""
echo "4️⃣ Alternative Installation:"
echo "   - Lade ha-stundenplan-card.js manuell in /config/www/"
echo "   - Füge als Resource hinzu: /local/ha-stundenplan-card.js"
echo ""

log_success "Diagnose abgeschlossen!"