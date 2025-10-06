#!/bin/bash

echo "🔨 Building card..."
npm run build

echo "📁 Copying card to test directory..."
cp dist/ha-stundenplan-card.js test/

echo "✅ Ready for testing!"
echo "🌐 Open: http://localhost:3000"
echo ""
echo "Test steps:"
echo "1. Click 'Card laden' to load the card"
echo "2. Check the IServ screenshots"
echo "3. Test the configuration editor"