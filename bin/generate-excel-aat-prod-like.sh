#!/usr/bin/env bash
source default.env
DIV_ENV=aat-prod-like
CCD_DEF_COS_URL=$npm_package_config_aat_cosUrl
CCD_DEF_CCD_URL=$npm_package_config_aat_ccdUrl
pushd ccd-definition-processor && yarn --cwd ccd-definition-processor json2xlsx -D ../definitions/divorce/json -o ../definitions/divorce/xlsx/ccd-config-${DIV_ENV:-base}.xlsx -e *-nonprod.json