#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'


extension=$1
main_js="main"


jupyter nbextension install $(pwd)/"$extension"/
jupyter nbextension enable "$extension"/"$main_js"
