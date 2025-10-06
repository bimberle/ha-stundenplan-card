# Stundenplan Card für Home Assistant

Eine moderne, konfigurierbare Lovelace Card zur Anzeige von Stundenplan-Daten in Home Assistant.

## ✨ Features

- 🎨 **Modernes Design** - Integriert sich nahtlos in Home Assistant
- ⚙️ **Grafischer Editor** - Einfache Konfiguration über die UI
- 🔐 **Sichere Authentifizierung** - HTTP Basic Auth Unterstützung
- 📏 **Anpassbare Höhe** - Perfekt für jedes Dashboard-Layout
- 🔄 **Automatisches Laden** - Kontinuierliche Aktualisierung der Daten
- 📱 **Responsive** - Funktioniert auf Desktop und Mobil

## 🚀 Installation über HACS

1. **HACS öffnen** in Home Assistant
2. **Gehe zu Frontend**
3. **Klicke das Menü** (⋮) → **Custom Repositories**
4. **Repository hinzufügen**:
   - URL: `https://github.com/IHR-GITHUB-BENUTZERNAME/ha-stundenplan-card`
   - Kategorie: `Lovelace`
5. **"ADD"** klicken
6. **Stundenplan Card** suchen und installieren
7. **Home Assistant neu starten**

## ⚙️ Konfiguration

### Über die UI (Empfohlen)
1. Dashboard bearbeiten
2. Card hinzufügen → **Custom: Stundenplan Card**
3. Parameter über den grafischen Editor einstellen

### YAML Konfiguration
```yaml
type: custom:ha-stundenplan-card
server: "https://ihr-stundenplan-server.de"
username: "ihr-benutzername"
password: "ihr-passwort"
height: 400
```

### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|-----|--------------|----------|--------------|
| `server` | string | ✅ Ja | - | URL des Stundenplan-Servers |
| `username` | string | ✅ Ja | - | Benutzername für die Anmeldung |
| `password` | string | ✅ Ja | - | Passwort für die Anmeldung |
| `height` | number | ❌ Nein | 400 | Höhe der Card in Pixel |

## 📊 Server API Format

Ihr Stundenplan-Server sollte einen Endpunkt `/api/stundenplan` bereitstellen:

**Endpoint:** `GET /api/stundenplan`  
**Auth:** HTTP Basic Authentication  
**Response:** JSON Array

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

## 🎨 Screenshots

![Stundenplan Card Example](https://via.placeholder.com/500x300/03a9f4/ffffff?text=Stundenplan+Card)

*Beispiel der Card in einem Home Assistant Dashboard*

## 🔧 Entwicklung

Siehe [DEVELOPMENT.md](DEVELOPMENT.md) für Entwicklungs- und Build-Anweisungen.

## 📝 Changelog

### v1.0.0
- ✨ Initiales Release
- 🎨 Modernes LitElement-basiertes Design
- ⚙️ Grafischer Konfigurations-Editor
- 🔐 HTTP Basic Auth Unterstützung
- 📏 Konfigurierbare Card-Höhe

## 🤝 Beitragen

Beiträge sind willkommen! Bitte:
1. Forke das Repository
2. Erstelle einen Feature Branch
3. Committe deine Änderungen
4. Erstelle einen Pull Request

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## 🆘 Support

Bei Problemen oder Fragen:
- 🐛 [Issues auf GitHub](https://github.com/IHR-GITHUB-BENUTZERNAME/ha-stundenplan-card/issues)
- 💬 [Home Assistant Community Forum](https://community.home-assistant.io/)

---

**Made with ❤️ for the Home Assistant Community**