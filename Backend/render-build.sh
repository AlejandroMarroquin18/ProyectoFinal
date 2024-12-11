#!/usr/bin/env bash
# exit on errors
set -o errexit

npm install
# npm run build # Uncomment if required

# Ensure Puppeteer cache directories exist
if [[ -d "$XDG_CACHE_HOME/puppeteer" ]]; then 
  echo "...Copying Puppeteer Cache from Build Cache"
  mkdir -p "$PUPPETEER_CACHE_DIR"
  cp -R "$XDG_CACHE_HOME/puppeteer/" "$PUPPETEER_CACHE_DIR"
elif [[ -d "$PUPPETEER_CACHE_DIR" ]]; then 
  echo "...Storing Puppeteer Cache in Build Cache"
  mkdir -p "$XDG_CACHE_HOME/puppeteer"
  cp -R "$PUPPETEER_CACHE_DIR/" "$XDG_CACHE_HOME/puppeteer"
else
  echo "Puppeteer Cache not found. Proceeding without cache."
fi
