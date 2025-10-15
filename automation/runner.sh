#!/bin/bash

echo "Running the Node.js script..."
node ./exporter.js
echo "Node.js script completed."

echo "Running the AppleScript..."
osascript ./affinity.scpt
echo "AppleScript completed."

echo "Running the Python script..."
python3 pdf-split.py
echo "Python script completed."

echo "All scripts completed."

echo "remove the pdf file"
rm -rf ./total.pdf