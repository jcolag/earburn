#!/usr/bin/env bash

# Boilerplate
set -o errexit
set -o errtrace
set -o nounset
set -o pipefail
trap 'echo "Aborting due to errexit on line $LINENO. Exit code: $?" >&2' ERR
_ME="$(basename "${0}")"

if [[ "${TRACE-0}" == "1" ]]
then
  set -o xtrace
fi

if [[ "${1-}" =~ ^-*h(elp)?$ ]] || [ $# -lt 1 ]
then
    echo "Usage: ${_ME} [browser]

This script will package up the Web Browser Extension in the current directory,
using the named manifest.  It will name the resulting file
ExtensionName-BrowserName-Version.zip.
"
    exit
fi

# Set up variables
browser=$1
if [ -z "$browser" ]
then
  browser="google"
fi
name=$(jq -r .name "${browser}.manifest.json")
version=$(jq -r .version "${browser}.manifest.json")

# Build the archive
cp "${browser}.manifest.json" manifest.json
zip -r "${name}-${browser}-${version}.zip" \
  manifest.json \
  earburn.js \
  earburn-bg.js \
  icons/* \
  popup/*

# Cleanup
rm manifest.json
mv "${name}-${browser}-${version}.zip" ~/Downloads/
