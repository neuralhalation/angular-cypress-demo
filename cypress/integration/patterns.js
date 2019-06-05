//** Scaffold describes that shows off some common function patterns */
describe('/some_endpoint_w_iframe', () => {
    beforEach(() => {
        cy.visit('/some_endpoint_w_iframe');
    });

    it('has an element class that all produce the same behavior w/ click', () => {
        cy.get('#iframe').iframe().find('.some-class').each(($element) => {
            cy.wrap($element).then(() => {
                const elementState = cy.get($element).then(() => {
                    return $element.css('changing-property');
                });

                cy.get($element).click();

                cy.get($element).should(() => {
                    expect($element.css('changing-property')).not.to.eq(elementState);
                });
            });
        });
    });
});