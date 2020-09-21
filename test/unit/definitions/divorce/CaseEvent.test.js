const {expect, assert} = require('chai');
const {size} = require('lodash');

const load = require;
const caseEvent = Object.assign(require('definitions/divorce/json/CaseEvent/CaseEvent'), []);
const MAX_NAME_LENGTH = 30;

function mergeCaseEventJsonNonProdFiles() {
    const definitions = []
        .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-deemed-and-dispensed-nonprod.json'))
        .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-general-order-nonprod.json'))
        .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-general-email-nonprod.json'))
        .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-pet-amend-nonprod.json'))
        .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-nonprod.json'));

    return [...caseEvent, ...definitions];
}

function mergeCaseEventJsonProdFiles() {
    const definitions = []
        .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-prod.json'));

    return [...caseEvent, ...definitions];
}

const validateEventNames = (caseEvents) => {
    const errors = [];
    caseEvents.forEach((caseEvent) => {
        if (caseEvent.Name && size(caseEvent.Name) > MAX_NAME_LENGTH) {
            errors.push(`Event Name '${caseEvent.Name}' is more than ${MAX_NAME_LENGTH}`);
        }
    });
    return errors;
}

describe('CaseEvent (non-prod)', () => {
    beforeEach()
    it('should not have an event name longer than 30 characters', () => {
        const errors = validateEventNames(mergeCaseEventJsonNonProdFiles());
        expect(size(errors), `Errors exist in one or more CaseEvent name: [${errors}]`).to.equal(0);
    });
});

describe('CaseEvent (prod)', () => {
    it('should not have an event name longer than 30 characters', () => {
        const errors = validateEventNames(mergeCaseEventJsonProdFiles());
        expect(size(errors), `Errors exist in one or more CaseEvent name: [${errors}]`).to.equal(0);
    });
});