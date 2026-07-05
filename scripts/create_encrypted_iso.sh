#!/usr/bin/env bash
# scripts/create_encrypted_iso.sh
# Usage: ./create_encrypted_iso.sh my_data_dir output.iso.enc
# Creates an ISO from directory, then encrypts it with GPG symmetric encryption
set -e
DIR=$1
OUT=$2
if [ -z "$DIR" ] || [ -z "$OUT" ]; then
  echo "Usage: $0 <dir> <out.iso.gpg>"
  exit 1
fi
TMPISO=$(mktemp /tmp/secureiso.XXXX.iso)
# create ISO
genisoimage -o "$TMPISO" -R -J "$DIR"
# encrypt symmetric with GPG (will prompt passphrase)
gpg --symmetric --cipher-algo AES256 -o "$OUT" "$TMPISO"
rm -f "$TMPISO"

echo "Encrypted ISO created: $OUT"
