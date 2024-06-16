describe('Тустируем конструктор', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
  });
  describe('Тустируем добавление ингредиентов в конструктор', () => {
    it('добавление ингредиентов в конструктор', () => {
      cy.get('[data-cy = "Краторная булка N-200i"]').children('button').click({ force: true });
      cy.get('[data-cy = "Биокотлета из марсианской Магнолии"]').children('button').click({ force: true });
      cy.get('[data-cy = "Соус Spicy-X"]').children('button').click({ force: true });

      cy.get('[data-cy= "constructor"]').contains('Краторная булка N-200i').should('exist');
      cy.get('[data-cy= "constructor"]').contains('Биокотлета из марсианской Магнолии').should('exist');
      cy.get('[data-cy= "constructor"]').contains('Соус Spicy-X').should('exist');
      cy.get('[data-cy= "constructor"]').contains('Краторная булка N-200i').should('exist');

    })
  });

  describe('Тустируем модальные окона', () => {
    it('открываем модальное окно', () => {
      cy.get('[data-cy = "Краторная булка N-200i"]').click();
      cy.get('[data-cy = "modal"]').should('contain.text', 'Детали ингредиента');
      cy.get('[data-cy = "modal"]').should('contain.text', 'Краторная булка N-200i');
    });
    it('закрываем модальное окно по клику на кнопку', () => {
      cy.get('[data-cy = "Краторная булка N-200i"]').click();
      cy.get('[data-cy = "modal"]').should('contain.text', 'Детали ингредиента');
      cy.get('[data-cy = "modal-close"]').click();
      cy.get('[data-cy = "modal"]').should('not.exist');
    });
    it('закрываем модальное окно по клику на overlay', () => {
      cy.get('[data-cy = "Краторная булка N-200i"]').click();
      cy.get('[data-cy = "modal"]').should('exist');
      cy.get('[data-cy="overlay"]').click({ force: true });
      cy.get('[data-cy = "modal"]').should('not.exist');
    });
  });
});
