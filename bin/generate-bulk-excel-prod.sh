#!/usr/bin/env bash
source default.env
DIV_ENV=prod CCD_DEF_COS_URL=$npm_package_config_prod_cosUrl CCD_DEF_CCD_URL=$npm_package_config_prod_ccdUrl yarn run generate-bulk-excel