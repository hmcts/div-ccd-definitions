#!/usr/bin/env bash
source default.env
DIV_ENV=demo
CCD_DEF_COS_URL=$npm_package_config_demo_cosUrl
CCD_DEF_CCD_URL=$npm_package_config_demo_ccdUrl
pushd ccd-definition-processor && yarn --cwd ccd-definition-processor json2xlsx -D ../definitions/divorce/json -o ../definitions/divorce/xlsx/ccd-config-${DIV_ENV:-base}.xlsx -e *-prod.json