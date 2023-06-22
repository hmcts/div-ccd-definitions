#!/usr/bin/env bash
source default.env
DIV_ENV=ithc-prod-like CCD_DEF_COS_URL=$npm_package_config_ithc_cosUrl CCD_DEF_CCD_URL=$npm_package_config_ithc_ccdUrl EXCLUDE='*-nonprod.json' yarn run generate-excel
