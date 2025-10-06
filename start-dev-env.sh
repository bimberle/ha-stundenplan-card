#!/bin/bash

# Home Assistant Stundenplan Card - Development Setup
# Für Mac ARM64 im Devcontainer

echo "🏠 Starting Home Assistant Development Environment..."

# 1. Start IServ Mock Service
echo "🔄 Starting IServ Mock Service on port 8234..."
cd /workspaces/ha-stundenplan/test
nohup node iserv-mock-server.js > ../logs/iserv-mock.log 2>&1 &
ISERV_PID=$!
echo "✅ IServ Mock Service started (PID: $ISERV_PID)"

# 2. Install Home Assistant Core via pip (lightweight for testing)
echo "🔄 Installing Home Assistant Core..."
cd /workspaces/ha-stundenplan
pip install homeassistant

# 3. Create HA config directory and copy files
echo "🔄 Setting up Home Assistant configuration..."
mkdir -p ~/.homeassistant/www
cp dist/ha-stundenplan-card.js ~/.homeassistant/www/
cp ha-config/configuration.yaml ~/.homeassistant/
cp ha-config/*.yaml ~/.homeassistant/

# 4. Start Home Assistant
echo "🏠 Starting Home Assistant on port 8123..."
mkdir -p logs
nohup hass --config ~/.homeassistant > logs/homeassistant.log 2>&1 &
HA_PID=$!
echo "✅ Home Assistant started (PID: $HA_PID)"

echo ""
echo "🚀 Services running:"
echo "   📊 IServ Mock: http://localhost:8234 (PID: $ISERV_PID)"
echo "   🏠 Home Assistant: http://localhost:8123 (PID: $HA_PID)"
echo ""
echo "📋 Next steps:"
echo "   1. Wait ~30 seconds for Home Assistant to initialize"
echo "   2. Open http://localhost:8123 in your browser"
echo "   3. Complete the initial setup"
echo "   4. Add the Stundenplan card to your dashboard"
echo ""
echo "📝 Card configuration:"
echo "   type: custom:ha-stundenplan-card"
echo "   title: \"Davids Stundenplan\""
echo "   server: \"http://localhost:8234\""
echo "   username: \"david.kech\""
echo "   password: \"131628%20131628\""
echo "   height: 400"
echo ""
echo "🛑 To stop services: pkill -f 'iserv-mock-server.js' && pkill -f 'hass'"

# Save PIDs for later cleanup
echo "$ISERV_PID" > logs/iserv.pid
echo "$HA_PID" > logs/ha.pid