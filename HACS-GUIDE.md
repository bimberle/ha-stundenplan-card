# 🚀 HACS Installation & Deployment Guide

## 📋 Schritt-für-Schritt Anleitung

### 1️⃣ GitHub Repository erstellen

```bash
# Gehe zu GitHub.com und erstelle ein neues Repository
# Name: ha-stundenplan-card
# Beschreibung: Home Assistant Stundenplan Card
# Public Repository (für HACS erforderlich)
```

### 2️⃣ Lokales Repository verbinden

```bash
cd /Users/michi/Nextcloud/dev/ha-stundenplan

# Git Repository initialisieren (falls noch nicht geschehen)
git init

# Remote Repository hinzufügen
git remote add origin https://github.com/IHR-GITHUB-BENUTZERNAME/ha-stundenplan-card.git

# Ersten Commit erstellen
git add .
git commit -m "🎉 Initial commit - Stundenplan Card v1.0.0"

# Zu GitHub pushen
git branch -M main
git push -u origin main
```

### 3️⃣ Deployment Script ausführen

```bash
# Das automatische Deployment starten
./deploy.sh
```

**Das Script macht folgendes:**
- ✅ Baut die Card (falls Node.js verfügbar)
- ✅ Aktualisiert Versionsnummern
- ✅ Erstellt Git Commit & Tag
- ✅ Pusht zu GitHub
- ✅ Erstellt GitHub Release (falls GitHub CLI verfügbar)

### 4️⃣ GitHub Release erstellen (falls manuell)

Falls das Script kein Release erstellt hat:

1. **Gehe zu deinem GitHub Repository**
2. **Klicke "Releases"** → **"Create a new release"**
3. **Tag:** `v1.0.0` (oder aktuelle Version)
4. **Title:** `🕐 Stundenplan Card v1.0.0`
5. **Beschreibung:**
   ```markdown
   ## ✨ Features
   - Konfigurierbare Stundenplan-Anzeige
   - Grafischer Editor für einfache Konfiguration
   - Sichere HTTP Basic Authentication
   - Anpassbare Card-Höhe
   ```
6. **Asset hochladen:** `dist/ha-stundenplan-card.js`
7. **"Publish release"** klicken

### 5️⃣ HACS Integration testen

#### Repository zu HACS hinzufügen:
1. **Home Assistant öffnen**
2. **HACS** → **Frontend**
3. **⋮ Menü** → **Custom repositories**
4. **Repository URL:** `https://github.com/IHR-BENUTZERNAME/ha-stundenplan-card`
5. **Kategorie:** `Lovelace`
6. **ADD** klicken

#### Card installieren:
1. **Stundenplan Card** in HACS suchen
2. **INSTALL** klicken
3. **Home Assistant neu starten**

#### Card verwenden:
1. **Dashboard bearbeiten**
2. **Add Card** → **Custom: Stundenplan Card**
3. **Konfiguration eingeben**

## 🔄 Updates & Neue Versionen

### Automatisches Update:
```bash
# Neue Version deployen
./deploy.sh

# Script fragt nach neuer Versionsnummer
# Erstellt automatisch Release
```

### Manuelles Update:
```bash
# 1. Version in package.json ändern
# 2. Card bauen
npm run build

# 3. Committen und taggen
git add .
git commit -m "🚀 Release v1.1.0"
git tag v1.1.0
git push origin main --tags

# 4. GitHub Release erstellen
```

## 📊 Überwachung & Monitoring

### GitHub Actions Status:
- **Build Tests:** Laufen bei jedem Commit
- **Release Builds:** Laufen bei Tags (v*)
- **Status:** Siehe GitHub Actions Tab

### HACS Analytics:
- Installationen werden in GitHub Insights angezeigt
- Issues & Pull Requests für Community-Feedback

## 🛠️ Troubleshooting

### Problem: "Repository nicht gefunden"
```bash
# Repository URL prüfen
git remote -v

# Korrekte URL setzen
git remote set-url origin https://github.com/IHR-BENUTZERNAME/ha-stundenplan-card.git
```

### Problem: "Build fehlgeschlagen"
```bash
# Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problem: "HACS findet Repository nicht"
- Repository muss **public** sein
- `hacs.json` muss im Root-Verzeichnis sein
- `info.md` muss vorhanden sein
- Mindestens ein Release muss existieren

### Problem: "Card lädt nicht in HA"
- Home Assistant nach HACS-Installation neu starten
- Browser-Cache leeren
- Developer Tools → Application → Clear Storage

## 📁 Repository-Struktur für HACS

```
ha-stundenplan-card/
├── .github/
│   └── workflows/
│       ├── release.yml          # Automatische Releases
│       └── test.yml            # Build Tests
├── assets/
│   ├── icon.svg                # Card Icon (groß)
│   └── icon-small.svg          # Card Icon (klein)
├── dist/
│   └── ha-stundenplan-card.js  # Gebaute Card
├── src/
│   ├── ha-stundenplan-card.ts  # Hauptdatei
│   ├── stundenplan-card.ts     # Card-Implementierung
│   ├── editor.ts               # Konfigurations-Editor
│   └── types.ts                # TypeScript Types
├── test/
│   └── index.html              # Test-Umgebung
├── hacs.json                   # HACS-Konfiguration
├── info.md                     # HACS-Beschreibung
├── package.json                # Node.js Dependencies
├── README.md                   # GitHub Readme
├── deploy.sh                   # Deployment Script
└── LICENSE                     # MIT Lizenz
```

## 🎯 Erfolgreiche HACS-Integration Checkliste

- ✅ Repository ist öffentlich auf GitHub
- ✅ `hacs.json` existiert und ist korrekt
- ✅ `info.md` existiert mit Beschreibung
- ✅ Mindestens ein Release mit gebauter Card
- ✅ `README.md` mit Installation & Konfiguration
- ✅ Asset-Files (Icons) sind verfügbar
- ✅ Repository in HACS als Custom Repository hinzugefügt

## 📞 Support & Community

- **Issues:** GitHub Issues für Bugs und Feature-Requests
- **Diskussionen:** GitHub Discussions für allgemeine Fragen
- **Community:** Home Assistant Community Forum
- **Updates:** GitHub Releases für neue Versionen