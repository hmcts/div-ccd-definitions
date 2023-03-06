#!/usr/bin/env bash
source default.env
DIV_ENV=preview
CCD_DEF_COS_URL=$COS_API_URL
CCD_DEF_CCD_URL=$CCD_DATA_API_URL
pushd ccd-definition-processor && yarn --cwd ccd-definition-processor json2xlsx -D ../definitions/divorce/json -o ../definitions/divorce/xlsx/ccd-config-${DIV_ENV:-base}.xlsx -e *-prod.json