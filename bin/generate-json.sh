#!/usr/bin/env bash
pushd ccd-definition-processor && yarn --cwd ccd-definition-processor xlsx2json -D ../definitions/divorce/json -i ../definitions/divorce/xlsx/ccd-config-base.xlsx && pretty-quick --pattern 'definitions/**/json/**.json'
