#!/usr/bin/env bash
source default.env
DIV_ENV=preview-custom CCD_DEF_COS_URL=$npm_package_config_preview_cosUrl CCD_DEF_CCD_URL=$npm_package_config_preview_ccdUrl yarn run generate-excel -e *-prod.json