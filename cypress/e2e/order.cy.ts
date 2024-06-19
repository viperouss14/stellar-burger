describe('Тестируем создание заказов', () => {
  beforeEach(() => {
    const baseUrl = Cypress.config('baseUrl');
    if (baseUrl) {
      cy.visit(baseUrl);
      cy.viewport(1280, 720);
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
      cy.intercept('GET', 'api/auth/user', { fixture: 'login.json' });
      cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
      localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
      cy.setCookie('accessToken', 'test-accessToken');     
    };

    cy.get('[data-cy = "constructor"]').as('constructor');
  });

  afterEach(() => {
    cy.clearCookies();
    localStorage.clear();
  });

  it('Создание заказа с авторизацией', () => {
    cy.contains('Личный кабинет').click();
    cy.contains('E-mail').type('example@mail.ru');
    cy.contains('Пароль').type('some41');
    cy.contains('Войти').click();
    cy.get('[data-cy = "Краторная булка N-200i"]').children('button').click({ force: true });
    cy.get('[data-cy = "Биокотлета из марсианской Магнолии"]').children('button').click({ force: true });
    cy.get('[data-cy = "Соус Spicy-X"]').children('button').click({ force: true });
    cy.get('button').contains('Оформить заказ').click();
    cy.get('[data-cy = "modal"]').should('contain.text', 'Ваш заказ начали готовить');
    cy.get('[data-cy = "order-number"]').should('contain.text', '42888');
    cy.get('[data-cy = "modal-close"]').click();
    cy.get('@constructor').contains('Краторная булка N-200i').should('not.exist');
    cy.get('@constructor').contains('Биокотлета из марсианской Магнолии').should('not.exist');
    cy.get('@constructor').contains('Соус Spicy-X').should('not.exist');
    cy.get('@constructor').contains('Краторная булка N-200i').should('not.exist');
    cy.get('[data-cy = "price"]').should('contain.text', '0');
  });
});
