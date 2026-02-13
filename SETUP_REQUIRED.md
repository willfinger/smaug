# ⚠️ MANUAL SETUP REQUIRED

## Configuration File Created

Smaug is installed and configured, but you must add your Twitter credentials.

## What You Need To Do

### Step 1: Get Twitter Credentials

1. Open Twitter/X in your browser
2. Press F12 to open Developer Tools
3. Go to: Application → Cookies → twitter.com
4. Find and copy these two values:
   - **auth_token** (long alphanumeric string)
   - **ct0** (shorter string)

### Step 2: Edit Configuration File

Edit: \`~/smaug/smaug.config.json\`

Replace the placeholder values:

\`\`\`json
{
  "twitter": {
    "authToken": "YOUR_AUTH_TOKEN_HERE",  // ← Replace with actual auth_token
    "ct0": "YOUR_CT0_HERE"              // ← Replace with actual ct0
  }
}
\`\`\`

### Step 3: Add Folder Mappings (Optional but Recommended for 2k+ Bookmarks)

Edit: \`~/smaug/smaug.config.json\`

Add your folder IDs to the \`folders\` object:

\`\`\`json
{
  "folders": {
    "1234567890": "ai-tools",
    "0987654321": "research-papers",
    "1122334455": "reading-list"
  }
}
\`\`\`

To get folder IDs:
1. Open: https://x.com/i/bookmarks
2. Click on each folder
3. Copy the folder ID from the URL
   - URL format: https://x.com/i/bookmarks/1234567890
   - Folder ID is: 1234567890

## Current Configuration

\`\`\`json
{
  "archiveFile": "./bookmarks.md",
  "pendingFile": "./.state/pending-bookmarks.json",
  "stateFile": "./.state/bookmarks-state.json",
  "parallelThreshold": 8,
  "timezone": "UTC",
  "twitter": {
    "authToken": "YOUR_AUTH_TOKEN_HERE",
    "ct0": "YOUR_CT0_HERE"
  },
  "autoInvokeClaude": true,
  "claudeModel": "sonnet"
}

  "claudeModel": "haiku",
  "claudeTimeout": 900000,
  "parallelThreshold": 8,
  "webhookUrl": null,
  "webhookType": "discord"
}

\`\`\`

## Ready to Test (After Adding Credentials)

Once you've added your Twitter credentials, run:

\`\`\`bash
cd ~/smaug

# Test with 10 bookmarks
npx smaug fetch --limit 10

# Full processing with cost tracking
npx smaug run --limit 100 -t
\`\`\`

## Next Steps

1. ✅ Add Twitter credentials to \`~/smaug/smaug.config.json\`
2. ✅ Add folder mappings (optional but recommended)
3. ✅ Run: \`npx smaug fetch --limit 10\` (test)
4. ✅ Run: \`npx smaug run --limit 100 -t\` (full process)

## Configuration Location

File: \`~/smaug/smaug.config.json\`

Edit with:
- nano: \`nano ~/smaug/smaug.config.json\`
- VS Code: \`code ~/smaug/smaug.config.json\`
- Vim: \`vim ~/smaug/smaug.config.json\`

---

**Status**: Configuration file created, waiting for Twitter credentials
