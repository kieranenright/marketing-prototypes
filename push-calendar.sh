#!/bin/bash
# Push updated calendar data live to GitHub Pages
cd "$(dirname "$0")"

# Check if there are changes to calendar-data.json
if git diff --quiet prototypes/calendar-data.json 2>/dev/null; then
  echo "No changes to calendar-data.json. Nothing to push."
  exit 0
fi

git add prototypes/calendar-data.json
git commit -m "Update campaign calendar data"
git push origin main

echo ""
echo "Done. Calendar data is now live on GitHub Pages."
echo "It may take 1-2 minutes to propagate."
