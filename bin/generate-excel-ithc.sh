#!/usr/bin/env bash
source default.env
DIV_ENV=ithc CCD_DEF_COS_URL=$npm_package_config_ithc_cosUrl CCD_DEF_CCD_URL=$npm_package_config_ithc_ccdUrl EXCLUDE='*-prod.json' yarn run generate-excel
