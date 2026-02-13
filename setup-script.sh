#!/bin/bash
echo "Running Smaug setup wizard..."
echo "This will guide you through:"
echo "1. Creating required directories"
echo "2. Getting Twitter credentials"
echo "3. Creating smaug.config.json"
echo ""
echo "Follow the prompts..."
echo ""

# Run the setup wizard - it's interactive so we'll let it run
npx smaug setup

# Check if config was created
if [ -f "smaug.config.json" ]; then
    echo ""
    echo "✅ Configuration file created!"
    echo "Location: $(pwd)/smaug.config.json"
else
    echo ""
    echo "❌ Configuration file not created"
    echo "Manual setup may be required"
fi
