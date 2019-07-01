#!/bin/bash
set -e

BRANCH="${1:-}"
ACR_TASKNAME=`echo "test-div-ccd-definition-importer-${BRANCH}x" | cut -c -49`

[ "_${BRANCH}" = "_" ] && echo "No BRANCH defined. Script terminated." && exit 0

az account set --subscription DCD-CNP-DEV

az acr task create \
    --registry hmcts \
    --name ${ACR_TASKNAME} \
    --file ./definition/acr-build-task.yaml \
    --context https://github.com/hmcts/cmc-ccd-domain.git \
    --branch ${BRANCH} \
    --values ./definition/VERSION.yaml \
    --git-access-token $GITHUB_TOKEN

az acr task run --registry hmcts --name ${ACR_TASKNAME}

az acr task delete  \
    --registry hmcts \
    --name ${ACR_TASKNAME}
