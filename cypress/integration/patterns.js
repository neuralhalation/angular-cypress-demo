const f = require('../support/functions');

//** Describes some common function patterns validating a form */
describe('generic form functions', () => {
    
    Cypress.env('routes').forEach((route) => {

        it('has header', () => {
            cy.visit(route['route']);
            cy.get('#iframe').iframe().find('h1').should('contain', route['header']);
        });

        it('has clickable conditional elements', () => {
            cy.visit(route['route']);
            cy.get('#iframe').iframe().find('.some-class').each((element) => {
                cy.wrap(element).then(() => {
                    const state = element.attr('changable-attribute');
                    cy.get(element).click();
                    cy.get(element).should(() => {
                        expect(element.attr('changable-attribute') !== state);
                    });
                });
            });
        });

        it('has fillable textboxes', () => {
            cy.visit(route['route']);
            let values = []
            cy.get('#iframe').iframe().find('input').each((element) => {
                cy.wrap(element).then(() => {
                    if (f.elementWithAttributeNotDisabled(element, 'type', 'text')) {
                        values.push(element.attr('value'));
                        cy.get(element).clear({force: true}).type('this is a test{enter}', {force: true});
                    }
                });
            });
            /*
                For some reason, if you try to execute cy.get() to find the iframe after
                finding it previously, the search will eventually time out, or run
                infinitely, I haven't checked. Once an iframe is found, cy.get() seems
                to keep your 'scope' inside the iframe, thus allowing us to successfully
                select the <form> tag in our second step.
            */
            cy.get('form').find('input').each((element, i) => {
                cy.wrap(element).then(() => {
                    if (f.elementWithAttributeNotDisabled(element, 'type', 'text')) {
                        cy.get(element).should('not.have.value', values[i]);
                    }
                });
            });
        });

        it('has checkable checkboxes', () => {
            cy.visit(route['route']);
            let values = []
            cy.get('#iframe').iframe().find('input').each((element) => {
                cy.wrap(element).then(() => {
                    if (f.elementWithAttributeNotDisabled(element, 'type', 'checkbox')) {
                        values.push(element.attr('value'));
                        cy.get(element).check({force: true});
                    }
                });
            });
            cy.get('form').find('input').each((element, i) => {
                cy.wrap(element).then(() => {
                    if (f.elementWithAttributeNotDisabled(element, 'type', 'checkbox')) {
                        cy.get(element).should('not.have.value', values[i]);
                    }
                });
            });
        });
    });

});