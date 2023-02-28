#!/usr/bin/env bash
source default.env
DIV_ENV=perftest CCD_DEF_COS_URL=$npm_package_config_perftest_cosUrl CCD_DEF_CCD_URL=$npm_package_config_perftest_ccdUrl EXCLUDE='*-prod.json' yarn run generate-excel