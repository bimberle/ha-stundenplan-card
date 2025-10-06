#!/bin/bash

# 🚀 Quick Start Script für Stundenplan Card Development

echo "🏠 Home Assistant Stundenplan Card - Quick Start"
echo "================================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Fehler: package.json nicht gefunden. Sind Sie im richtigen Verzeichnis?"
    exit 1
fi

echo "📦 Schritt 1: Überprüfe Node.js Installation..."

# Check Node.js installation
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js gefunden: $NODE_VERSION"
    
    # Install dependencies
    echo "📦 Schritt 2: Installiere Dependencies..."
    npm install
    
    # Build the card
    echo "🔨 Schritt 3: Baue die Card..."
    npm run build
    
    if [ -f "dist/ha-stundenplan-card.js" ]; then
        echo "✅ Card erfolgreich gebaut!"
        
        # Start test server
        echo "🚀 Schritt 4: Starte Test-Server..."
        echo ""
        echo "🌐 Öffne in Ihrem Browser: http://localhost:3000"
        echo "⏹️  Zum Beenden: Ctrl+C drücken"
        echo ""
        
        npm run test
    else
        echo "❌ Build fehlgeschlagen. Bitte Fehler prüfen."
        exit 1
    fi
    
else
    echo "❌ Node.js nicht gefunden."
    echo ""
    echo "📋 Alternative: Python Test-Server (ohne Build)"
    echo "================================================"
    echo ""
    echo "Falls Sie Node.js nicht installieren möchten, können Sie"
    echo "trotzdem die Test-Umgebung verwenden:"
    echo ""
    echo "1. Führen Sie aus: python3 -m http.server 3000 --directory test"
    echo "2. Öffnen Sie: http://localhost:3000"
    echo "3. Klicken Sie 'Card laden' (funktioniert mit Pre-Built Version)"
    echo ""
    
    read -p "🤔 Möchten Sie den Python Test-Server jetzt starten? (y/n): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🚀 Starte Python Test-Server..."
        echo "🌐 Öffne: http://localhost:3000"
        echo "⏹️  Zum Beenden: Ctrl+C drücken"
        echo ""
        
        python3 -m http.server 3000 --directory test
    fi
fi