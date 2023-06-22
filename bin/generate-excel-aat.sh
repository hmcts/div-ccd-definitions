#!/usr/bin/env bash
source default.env
DIV_ENV=aat CCD_DEF_COS_URL=$npm_package_config_aat_cosUrl CCD_DEF_CCD_URL=$npm_package_config_aat_ccdUrl EXCLUDE='*-prod.json' yarn run generate-excel
