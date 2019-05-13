# div-ccd-definitions
Divorce configuration definitions for CCD


## Setup

### Include the submodule

* If you're cloning the repository for the first time, use 

`git clone --recursive git@github.com:hmcts/div-ccd-definitions.git`

* If you've already cloned the project

`git submodule update --init --recursive`

### Install

Run `yarn install` to install the dependencies for both this project and the submodule

## Convert JSON to Excel

### For all environments

`yarn generate-excel-all` to generate excel configs for all environments (Demo, AAT and Prod) 

The generated excel files will be in `defintions/divorce/xlsx`

### For a specific environment

`yarn generate-excel-(demo\aat\prod)` 

For example

`yarn generate-excel-aat`


## Convert Excel to JSON

If you prefer to make the changes directly on the excel file, and then convert back to JSON:

1) Generate a fresh **base** Excel file using the `yarn generate-excel`. The generated excel file will be in `defintions/divorce/xlsx/ccd-config-base.xlsx` and will contain placeholder URLs.
2) Make the changes to `ccd-config-base.xlsx` but ensure you don't have any environment-specific URLs (use placeholders instead).
3) Once you're satisfied with your changes in the Excel file, convert back to JSON using `yarn generate-json`
4) Review the JSON file changes to ensure all your changes are correct

## Release

When we make a major change for a release:

1) Increment the version number in `CaseType.json` (e.g v113.xx)
2) Generate all excel files using `yarn generate-excel-all`
3) Create a new release in https://github.com/hmcts/div-ccd-definitions/releases/new
4) Upload all the generate Excel files to the release and add give it the same version number from (1)
