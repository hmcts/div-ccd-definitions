# div-ccd-definitions
Divorce configuration definitions for CCD

## Setup

### Pre-requirements 
Install nvm to manage node from https://github.com/nvm-sh/nvm

Install requiered node version using `nvm install`

### Install

Run `yarn install && yarn setup` to install the dependencies for both this project and the submodule

## Convert JSON to Excel

### For all environments

`yarn generate-excel-all` to generate excel configs for all environments (Demo, AAT and Prod) 

The generated excel files will be in `defintions/divorce/xlsx`

### For a specific environment

`yarn generate-excel-(local\demo\aat\prod)` 

For example

`yarn generate-excel-aat`

### For a bulk-action config

`yarn generate-bulk-excel-(local\demo\aat\prod)` 

For example

`yarn generate-bulk-excel-aat`

### For all environments bulk-action's config

`yarn generate-bulk-excel-all` 

## Convert Excel to JSON

If you prefer to make the changes directly on the excel file, and then convert back to JSON:

1) Generate a fresh **base** Excel file using the `yarn generate-excel`. The generated excel file will be in `defintions/divorce/xlsx/ccd-config-base.xlsx` and will contain placeholder URLs.
2) Make the changes to `ccd-config-base.xlsx` but ensure you don't have any environment-specific URLs (use placeholders instead).
3) Once you're satisfied with your changes in the Excel file, convert back to JSON using `yarn generate-json`
4) Review the JSON file changes to ensure all your changes are correct

## Accessing CCD on preview/per PR

A full CCD instance is created PR via Helm charts which can be accessed using the details below.

If you do not require this, add `[NO-CCD]` at the start of the PR title in GitHub.

* Visit `https://gateway-div-ccd-definitions-pr-<number>.service.core-compute-preview.internal` and whitelist accept the SSL certificate
* Access the PR on `https://case-management-web-div-ccd-definitions-pr-<number>.service.core-compute-preview.internal`
* Login with an authorised AAT user [listed here](https://github.com/hmcts/div-ccd-definitions/blob/master/definitions/divorce/json/UserProfile.json)

## Applications useful urls

* CCD admin `https://admin-web-div-ccd-definitions-pr-<number>.service.core-compute-preview.internal`
* CCD data-store-api `http://data-store-api-div-ccd-definitions-pr-<number>.service.core-compute-preview.internal`

To run divorce test on CCD PR environment you need to replace `core_case_data.api.url` on COS and CMS to use your PR `data-store-api` URL 

## Release

When we make a major change for a release:

1) Increment the version number in `CaseType.json` (e.g v113.xx)
2) Generate all excel files using `yarn generate-excel-all`
3) Create a new release in https://github.com/hmcts/div-ccd-definitions/releases/new
4) Upload all the generate Excel files to the release and add give it the same version number from (1)
