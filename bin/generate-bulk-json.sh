#!/usr/bin/env bash
pushd ccd-definition-processor && yarn --cwd ccd-definition-processor xlsx2json -D ../definitions/bulk-action/json -i ../definitions/bulk-action/xlsx/ccd-config-base.xlsx && pretty-quick --pattern 'definitions/**/json/**.json'
