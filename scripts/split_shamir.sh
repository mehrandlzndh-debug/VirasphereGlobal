#!/usr/bin/env bash
# scripts/split_shamir.sh
# Requires: openssl + ssss (or use `npm i -g shamir` for JS)
# This is a helper that uses ssss (Shamir's Secret Sharing Scheme) to split a passphrase
# Usage: ./split_shamir.sh secretfile shares threshold
# Example: ./split_shamir.sh ./master_seed.txt 5 3

SECRETFILE=$1
SHARES=${2:-5}
THRESHOLD=${3:-3}
if [ -z "$SECRETFILE" ]; then
  echo "Usage: $0 secretfile shares threshold"
  exit 1
fi
if ! command -v ssss-split >/dev/null 2>&1; then
  echo "Please install ssss (ssss-split) or use an alternative Shamir tool. On Debian: apt-get install ssss"
  exit 1
fi

ssss-split -t $THRESHOLD -n $SHARES < "$SECRETFILE"
