#!/bin/bash

# Step 1: Specify Hugo Version
HUGO_VERSION="0.123.8"

# Step 2: Fetch Hugo
echo "Fetching Hugo $HUGO_VERSION..."
curl -L https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz | tar xz
mv hugo /usr/local/bin/

# Step 3: Build the Project
echo "Building project..."
hugo

# Optional: Additional steps can be added as needed
# echo "Running additional build steps..."
