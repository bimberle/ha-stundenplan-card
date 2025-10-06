# 🚀 Entwicklung & Testing Guide

## 📋 Optionen zum Testen der Card

### Option 1: Dev Container (Empfohlen) 🐳

Der Dev Container stellt eine konsistente Entwicklungsumgebung bereit:

1. **VS Code mit Dev Container Extension öffnen**
2. **Command Palette** öffnen (`Cmd/Ctrl + Shift + P`)
3. **"Dev Containers: Reopen in Container"** wählen
4. Der Container wird automatisch aufgebaut und alle Dependencies installiert

### Option 2: Lokale Installation 💻

Falls Sie Node.js lokal installieren möchten:

```bash
# Node.js von https://nodejs.org/ installieren (v18+ empfohlen)
# Dann im Projektverzeichnis:
npm install
```

## 🔨 Build & Test Workflow

### 1. Card bauen
```bash
npm run build
```

### 2. Test-Server starten
```bash
# Startet HTTP Server auf Port 3000
npm run test
```

### 3. Öffne Browser
Gehe zu: http://localhost:3000

## 🎯 Was Sie in der Test-Umgebung tun können

### ✅ Card-Funktionalität testen
- **"Card laden"** - Lädt die gebaute Card
- **"Editor testen"** - Testet den Konfigurations-Editor
- **"Mit Mock-Daten testen"** - Verwendet Beispiel-Stundenplan-Daten

### 📊 Mock-Daten Format
Die Test-Umgebung verwendet folgende Beispiel-Daten:
```json
[
  {
    "time": "08:00 - 09:30",
    "subject": "Mathematik", 
    "room": "A101"
  },
  {
    "time": "09:45 - 11:15",
    "subject": "Deutsch",
    "room": "B203"
  }
]
```

## 🔄 Development Workflow

### Watch Mode für kontinuierliche Entwicklung:
```bash
# Terminal 1: Build Watch Mode
npm run build:watch

# Terminal 2: Test Server
npm run test
```

### Code-Änderungen:
1. Bearbeiten Sie Dateien in `src/`
2. Rollup baut automatisch neu (Watch Mode)
3. Aktualisieren Sie den Browser
4. Testen Sie die Änderungen

## 🏠 Integration in Home Assistant

### Schritt 1: Card-Datei kopieren
```bash
# Nach erfolgreichem Build:
cp dist/ha-stundenplan-card.js /path/to/homeassistant/www/
```

### Schritt 2: Resource zu Lovelace hinzufügen
In der Home Assistant UI:
1. **Configuration** → **Lovelace Dashboards**  
2. **Resources** Tab
3. **Add Resource**:
   - URL: `/local/ha-stundenplan-card.js`
   - Resource Type: `JavaScript Module`

### Schritt 3: Card zu Dashboard hinzufügen
```yaml
type: custom:ha-stundenplan-card
server: "https://ihr-stundenplan-server.de"
username: "ihr-benutzername"
password: "ihr-passwort"
height: 400
```

## 🛠️ Verfügbare Scripts

| Script | Beschreibung |
|--------|-------------|
| `npm run build` | Baut die Card für Produktion |
| `npm run dev` | Build mit Watch Mode |
| `npm run test` | Startet Test-Server |
| `npm run serve` | Startet Server für dist/ |
| `npm run lint` | Code-Linting |
| `npm run clean` | Löscht build-Dateien |

## 🔍 Troubleshooting

### Card lädt nicht in der Test-Umgebung
1. Stelle sicher, dass `npm run build` erfolgreich war
2. Prüfe die Browser-Konsole auf Fehler
3. Stelle sicher, dass der Test-Server läuft

### TypeScript-Fehler
```bash
# Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install
```

### Dev Container startet nicht
1. Stelle sicher, dass Docker läuft
2. VS Code Dev Container Extension ist installiert
3. Neustart von VS Code versuchen

## 📝 API-Server Integration

Ihr Stundenplan-Server sollte folgenden Endpunkt bereitstellen:

**GET** `/api/stundenplan`
- **Auth**: HTTP Basic Auth
- **Response**: JSON Array mit Stundenplan-Einträgen

```bash
# Beispiel-Server-Test:
curl -u username:password https://ihr-server.de/api/stundenplan
```

Die Card erwartet JSON im Format:
```json
[
  {
    "time": "08:00 - 09:30",
    "subject": "Fach-Name",
    "room": "Raum-Nummer"
  }
]
```