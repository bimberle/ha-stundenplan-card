#!/bin/bash

# 🚀 Einfacher GitHub Release Creator
# Erstellt Release mit curl direkt

REPO_OWNER="bimberle"
REPO_NAME="ha-stundenplan-card"
TAG_NAME="v1.0.3"
ASSET_FILE="ha-stundenplan-card.js"

echo "🚀 Erstelle GitHub Release für HACS..."
echo "Repository: $REPO_OWNER/$REPO_NAME"
echo "Tag: $TAG_NAME"

# Neuen Tag erstellen
echo "📝 Erstelle neuen Git Tag..."
git tag -a "$TAG_NAME" -m "HACS Release with Asset"
git push origin "$TAG_NAME"

echo "Asset-Datei: $ASSET_FILE ($(wc -c < $ASSET_FILE) bytes)"

# GitHub Token abfragen
read -p "🔑 GitHub Personal Access Token: " -s GITHUB_TOKEN
echo ""

# Release JSON
RELEASE_JSON='{
  "tag_name": "'$TAG_NAME'",
  "target_commitish": "main",
  "name": "🕐 Stundenplan Card '$TAG_NAME' - HACS Ready",
  "body": "## 🕐 Stundenplan Card - HACS Ready!\n\n✨ **HACS-kompatible Version**\n\n### Installation über HACS\n1. Füge `https://github.com/'$REPO_OWNER'/'$REPO_NAME'` als Custom Repository zu HACS hinzu\n2. Kategorie: **Lovelace**\n3. Installiere \"Stundenplan Card\"\n4. Starte Home Assistant neu\n\n### Konfiguration\n```yaml\ntype: custom:ha-stundenplan-card\nserver: \"https://ihr-stundenplan-server.de\"\nusername: \"ihr-benutzername\"\npassword: \"ihr-passwort\"\nheight: 400\n```\n\n**Dateigröße:** '$(wc -c < $ASSET_FILE)' bytes | **HACS-Ready** ✅",
  "draft": false,
  "prerelease": false
}'

# Release erstellen
echo "📦 Erstelle Release..."
RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  -d "$RELEASE_JSON" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases")

echo "API Response: $RESPONSE"

# Release-ID extrahieren
RELEASE_ID=$(echo "$RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
UPLOAD_URL=$(echo "$RESPONSE" | grep -o '"upload_url":"[^"]*' | cut -d'"' -f4 | sed 's/{?name,label}//')

if [ -n "$RELEASE_ID" ]; then
    echo "✅ Release erstellt (ID: $RELEASE_ID)"
    
    # Asset hochladen
    echo "📤 Lade Asset hoch..."
    ASSET_RESPONSE=$(curl -s -X POST \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Accept: application/vnd.github.v3+json" \
      -H "Content-Type: application/javascript" \
      --data-binary @"$ASSET_FILE" \
      "$UPLOAD_URL?name=$ASSET_FILE")
    
    echo "Asset Response: $ASSET_RESPONSE"
    
    ASSET_ID=$(echo "$ASSET_RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
    
    if [ -n "$ASSET_ID" ]; then
        echo "✅ Asset hochgeladen (ID: $ASSET_ID)"
        echo ""
        echo "🎉 ERFOLG!"
        echo "📦 Release: https://github.com/$REPO_OWNER/$REPO_NAME/releases/tag/$TAG_NAME"
        echo ""
        echo "📋 Nächste Schritte:"
        echo "1. Warte 10 Minuten (HACS-Cache)"
        echo "2. HACS → Frontend → Stundenplan Card suchen"
        echo "3. Installieren & HA neu starten"
    else
        echo "❌ Asset-Upload fehlgeschlagen"
    fi
else
    echo "❌ Release-Erstellung fehlgeschlagen"
fi