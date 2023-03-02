#!/usr/bin/env bash
source default.env
DIV_ENV=local CCD_DEF_COS_URL=$npm_package_config_local_cosUrl CCD_DEF_CCD_URL=$npm_package_config_local_ccdUrl yarn run generate-excel -e *-prod.json