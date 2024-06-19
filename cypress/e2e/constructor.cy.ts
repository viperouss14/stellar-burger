describe('Тестируем конструктор', () => {
  beforeEach(() => {
    const baseUrl = Cypress.config('baseUrl');
    if (baseUrl) {
      cy.visit(baseUrl);
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    } else {
      throw new Error('baseUrl is not defined');
    };

    cy.get('[data-cy = "Краторная булка N-200i"]').as('testElem');
    cy.get('[data-cy = "constructor"]').as('constructor');
  });

  describe('Тестируем добавление ингредиентов в конструктор', () => {
    it('добавление ингредиентов в конструктор', () => {
      cy.get('@testElem').children('button').click({ force: true });
      cy.get('[data-cy = "Биокотлета из марсианской Магнолии"]').children('button').click({ force: true });
      cy.get('[data-cy = "Соус Spicy-X"]').children('button').click({ force: true });

      cy.get('@constructor').contains('Краторная булка N-200i').should('exist');
      cy.get('@constructor').contains('Биокотлета из марсианской Магнолии').should('exist');
      cy.get('@constructor').contains('Соус Spicy-X').should('exist');
      cy.get('@constructor').contains('Краторная булка N-200i').should('exist');

    })
  });

  describe('Тестируем модальные окона', () => {
    it('открываем модальное окно', () => {
      cy.get('@testElem').click();
      cy.get('[data-cy = "modal"]').should('contain.text', 'Детали ингредиента');
      cy.get('[data-cy = "modal"]').should('contain.text', 'Краторная булка N-200i');
    });
    it('закрываем модальное окно по клику на кнопку', () => {
      cy.get('@testElem').click();
      cy.get('[data-cy = "modal"]').as('modal');
      cy.get('@modal').should('contain.text', 'Детали ингредиента');
      cy.get('[data-cy = "modal-close"]').click();
      cy.get('@modal').should('not.exist');
    });
    it('закрываем модальное окно по клику на overlay', () => {
      cy.get('@testElem').click();
      cy.get('[data-cy = "modal"]').as('modal');
      cy.get('@modal').should('exist');
      cy.get('[data-cy = "overlay"]').click({ force: true });
      cy.get('@modal').should('not.exist');
    });
  });
});
