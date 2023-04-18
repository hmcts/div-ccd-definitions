#!/usr/bin/env bash
source default.env
DIV_ENV=aat
CCD_DEF_COS_URL=$npm_package_config_aat_cosUrl
CCD_DEF_CCD_URL=$npm_package_config_aat_ccdUrl
pushd ccd-definition-processor && yarn --cwd ccd-definition-processor json2xlsx -D ../definitions/bulk-action/json -o ../definitions/bulk-action/xlsx/ccd-div-bulk-action-config-${DIV_ENV:-base}.xlsx