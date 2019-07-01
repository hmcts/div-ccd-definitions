#!/bin/bash
set -e

BRANCH="${1:-}"
ACR_TASKNAME=`echo "div-ccd-definition-importer-${CHANGE_ID}" | cut -c -49`

[ "_${CHANGE_ID}" = "_" ] && echo "No BRANCH defined. Script terminated." && exit 0

az login
az account list
az account set --subscription DCD-CNP-DEV

az acr task create \
    --registry hmcts \
    --name ${ACR_TASKNAME} \
    --file ./definition/acr-build-task.yaml \
    --context https://github.com/hmcts/cmc-ccd-domain.git \
    --branch ${CHANGE_BRANCH} \
    --values ./definition/VERSION.yaml \
    --git-access-token $GITHUB_TOKEN

az acr task run --registry hmcts --name ${ACR_TASKNAME}

az acr task delete  \
    --registry hmcts \
    --name ${ACR_TASKNAME}
