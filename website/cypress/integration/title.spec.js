describe('ui test', () => {
  it('title present', () => {
    cy.visit('/');
    cy.get('h1').should('be.visible');
  });

  it('should return pre-added items', () => {
    cy.exec('mongorestore --drop dump-digits').its('code').should('eq', 0);
    cy.visit('/');
    cy.url();
    cy.window().its('superagent').invoke('get', 'http://localhost:3000').then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array').that.is.not.empty;
      expect(response.body.find((i) => i.name === 'one')).to.not.be.undefined;
    });
    /* cy.request({
      method: 'GET',
      url: 'http://localhost:3000',
    }).then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array').that.is.not.empty;
      expect(response.body.find((i) => i.name === 'one')).to.not.be.undefined;
    }); */
  });

  it.skip('should return different pre-added items', () => {
    cy.exec('mongorestore --drop dump-words').its('code').should('eq', 0);
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000',
    }).then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array').that.is.not.empty;
      expect(response.body.find((i) => i.name === 'hi')).to.not.be.undefined;
    });
  });

  it.skip('should check that db is empty', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000',
    }).then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array').that.is.empty;
    });
  });

  afterEach(() => {
    cy.url();
    cy.window().its('polly').invoke('stop');
    cy.exec('mongo testCypress --eval "printjson(db.dropDatabase())"').its('code').should('eq', 0);
    cy.reload();
  });
});
