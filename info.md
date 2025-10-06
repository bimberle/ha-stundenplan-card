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
