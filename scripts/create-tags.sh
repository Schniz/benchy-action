#!/bin/bash

set -e

TAGS_TO_CREATE=$(node -e 'require("./package.json").version.split(".").slice(0, -1).forEach((_, i, arr) => console.log("v" + arr.slice(0, i+1).join(".")))')

echo "Creating tags: $TAGS_TO_CREATE"

for tagname in $TAGS_TO_CREATE; do
  git tag --force "$tagname" || true
  git push --force origin "$tagname"
  echo "🏷  $tagname"
done
