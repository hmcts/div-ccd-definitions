#!/usr/bin/env bash
pushd ccd-definition-processor && yarn --cwd ccd-definition-processor json2xlsx -D ../definitions/divorce/json -e ${EXCLUDE} -o ../definitions/divorce/xlsx/ccd-config-${DIV_ENV:-base}.xlsx && popd
