#!/usr/bin/env bash
source default.env
DIV_ENV=demo CCD_DEF_COS_URL=$npm_package_config_demo_cosUrl CCD_DEF_CCD_URL=$npm_package_config_demo_ccdUrl yarn run generate-bulk-excel