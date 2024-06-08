#!/bin/sh
cd "$(pwd)"
git add .
if ! git diff --quiet --cached; then
    git commit -m "Automated Backup commit"
    git push origin master
fi
