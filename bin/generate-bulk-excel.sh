#!/usr/bin/env bash
pushd ccd-definition-processor && yarn --cwd ccd-definition-processor json2xlsx -D ../definitions/bulk-action/json -e ${EXCLUDE} -o ../definitions/bulk-action/xlsx/ccd-div-bulk-action-config-${DIV_ENV:-base}.xlsx && popd
