#!/usr/bin/env bash
source default.env
DIV_ENV=demo-prod-like CCD_DEF_COS_URL=$npm_package_config_demo_cosUrl CCD_DEF_CCD_URL=$npm_package_config_demo_ccdUrl EXCLUDE='*-prod.json' yarn run generate-excel