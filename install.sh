#!/usr/bin/env bash
set -eo pipefail
IFS=$'\n\t'

if [[ -z "$1" ]]; then
    echo 'usage: ./install.sh [extension]'
    echo ''
    echo 'Possible extensions:'
    for extension in $(ls extensions); do
        echo "  - ${extension}"
    done
    exit 1;
fi

extension=$1
main_js="main"


jupyter nbextension install $(pwd)/extensions/"$extension"/
jupyter nbextension enable "$extension"/"$main_js"
