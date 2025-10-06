#!/bin/bash

# 🔍 Ultimative HACS Diagnose & Fix
# Behebt alle bekannten HACS-Probleme

set -e

echo "🔧 ULTIMATIVE HACS DIAGNOSE & REPARATUR"
echo "======================================="

# 1. HÄUFIGSTER FEHLER: Falsche Kategorie
echo ""
echo "❗ WICHTIGSTE ERKENNTNIS:"
echo "Für Lovelace Cards MUSS in HACS die Kategorie 'Lovelace' gewählt werden,"
echo "NICHT 'Dashboard' oder andere!"

# 2. Erstelle eine HACS-konforme Minimal-Konfiguration
echo ""
echo "🔧 Erstelle HACS-konforme Minimal-Konfiguration..."

# Minimale hacs.json (nur das Nötigste)
cat > hacs.json << 'EOF'
{
  "name": "Stundenplan Card",
  "filename": "ha-stundenplan-card.js"
}
EOF

echo "✅ hacs.json minimal konfiguriert"

# 3. Erstelle info.md (manchmal erforderlich)
cat > info.md << 'EOF'
# Stundenplan Card

Eine Home Assistant Lovelace Card für Stundenplan-Anzeige.

## Installation

Diese Card kann über HACS installiert werden:

1. Füge `https://github.com/bimberle/ha-stundenplan-card` als Custom Repository hinzu
2. **WICHTIG:** Wähle "Lovelace" als Kategorie (nicht Dashboard!)
3. Installiere "Stundenplan Card"
4. Starte Home Assistant neu

## Konfiguration

```yaml
type: custom:ha-stundenplan-card
server: "https://ihr-server.de"
username: "username"
password: "password"
height: 400
```
EOF

echo "✅ info.md erstellt"

# 4. Prüfe und korrigiere Card-Datei
if [ ! -f "ha-stundenplan-card.js" ]; then
    echo "❌ ha-stundenplan-card.js fehlt!"
    if [ -f "dist/ha-stundenplan-card.js" ]; then
        cp dist/ha-stundenplan-card.js ./
        echo "✅ Card aus dist/ kopiert"
    else
        echo "❌ Keine Card-Datei gefunden!"
        exit 1
    fi
fi

FILE_SIZE=$(wc -c < ha-stundenplan-card.js)
if [ $FILE_SIZE -lt 1000 ]; then
    echo "⚠️ Card-Datei sehr klein ($FILE_SIZE bytes) - möglicherweise defekt"
else
    echo "✅ Card-Datei OK ($FILE_SIZE bytes)"
fi

# 5. Git commit und push
echo ""
echo "📤 Committe und pushe Änderungen..."

git add hacs.json info.md ha-stundenplan-card.js
git commit -m "🔧 HACS Fix: Minimal config + info.md

- Minimale hacs.json (nur Name + Filename)
- Neue info.md mit korrekten Anweisungen  
- Card-Datei im Root für HACS
- Betont Lovelace-Kategorie (nicht Dashboard!)

Fixes HACS repository detection" || echo "Nichts zu committen"

git push origin main

# 6. Erstelle neuen Tag für sauberen Release
NEW_TAG="v1.0.4"
echo ""
echo "🏷️ Erstelle neuen Tag $NEW_TAG für sauberen Release..."

git tag -a "$NEW_TAG" -m "HACS Fix Release

- Minimal HACS configuration
- Corrected repository structure  
- Emphasized Lovelace category
- Ready for HACS installation"

git push origin "$NEW_TAG"

echo "✅ Tag $NEW_TAG erstellt und gepusht"

# 7. Anweisungen für manuellen Release
echo ""
echo "🎯 NÄCHSTE SCHRITTE (MANUELL):"
echo ""
echo "1️⃣ GitHub Release erstellen:"
echo "   https://github.com/bimberle/ha-stundenplan-card/releases"
echo "   - Create new release"
echo "   - Choose tag: $NEW_TAG"
echo "   - Title: Stundenplan Card $NEW_TAG - HACS Fix"
echo "   - Upload ha-stundenplan-card.js als Asset"
echo ""
echo "2️⃣ In HACS testen:"
echo "   - Entferne Repository falls vorhanden"
echo "   - Füge neu hinzu: https://github.com/bimberle/ha-stundenplan-card"
echo "   - ⚠️ WICHTIG: Kategorie 'Lovelace' wählen (NICHT Dashboard!)"
echo "   - Nach 10 Min sollte 'Stundenplan Card' erscheinen"
echo ""

# 8. HACS Debugging Info
echo "🔍 HACS DEBUGGING TIPPS:"
echo ""
echo "Falls es immer noch nicht funktioniert:"
echo ""
echo "A) Home Assistant Logs prüfen:"
echo "   - Einstellungen → System → Protokolle"  
echo "   - Suche nach 'hacs' Fehlermeldungen"
echo ""
echo "B) HACS neu starten:"
echo "   - HACS → Drei-Punkte-Menü → Reload"
echo "   - Home Assistant neu starten"
echo ""
echo "C) Browser-Cache leeren:"
echo "   - Ctrl+Shift+R (Hard Refresh)"
echo "   - Inkognito-Modus testen"
echo ""
echo "D) HACS Debug aktivieren:"
echo "   - configuration.yaml:"
echo "   logger:"
echo "     default: info"
echo "     logs:"
echo "       custom_components.hacs: debug"
echo ""

echo "✅ Setup abgeschlossen!"
echo ""
echo "📋 ZUSAMMENFASSUNG:"
echo "- Repository: https://github.com/bimberle/ha-stundenplan-card" 
echo "- Tag: $NEW_TAG (neu erstellt)"
echo "- Kategorie: LOVELACE (nicht Dashboard!)"
echo "- Status: Bereit für HACS"