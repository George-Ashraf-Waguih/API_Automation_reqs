/// <reference types="cypress" />
import 'cypress-mochawesome-reporter/register';
// import 'cypress-plugin-api';


describe('API test suite for Reqres', () => {
  const baseUrl = 'https://reqres.in/api'

  it('GET users - should return list of users', () => {
    cy.request(`${baseUrl}/users?page=2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.length(6);
    })
  });

  it('GET users - should return user details', () => {
    cy.request(`${baseUrl}/users/7`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('first_name', 'Michael')
      expect(response.body.data).to.have.property('last_name', 'Lawson')
      expect(response.body.data).to.have.property('email', 'michael.lawson@reqres.in')
    })
  });

  it('POST users - should create a new user', function () {

    cy.fixture('user').then((user) => {
      cy.request('POST', `${baseUrl}/users`, user.newUser).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name', user.newUser.name);
        expect(response.body).to.have.property('job', user.newUser.job);
      });
    });
  })

  it('Put users - should update existing user', () => {

    cy.fixture('user').then((user) => {
      cy.request('PUT', `${baseUrl}/users/1`, user.updatedUser).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', user.updatedUser.name);
        expect(response.body).to.have.property('job', user.updatedUser.job);
      })
    })
  });

  it('Delete users - should delete specific user', () => {

    cy.request('DELETE', `${baseUrl}/users/4`).then((response) => {
      expect(response.status).to.eq(204);
    })
  });
});