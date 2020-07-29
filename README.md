### Example of using PollyJS with Cypress

Here is example of using PollyJS in Cypress when requests
sent via xhr (superagent library).

#### Setup

Polly setup take place in every test in cy.visit call
onBeforeLoad hook, where new instance of polly created
and attached to window object. Don't forget to add stop
call on polly object in afterEach hook.

```javascript
afterEach(() => {
  cy.url();
  cy.window().its('polly').invoke('stop');
});
```
If we not call cy.url() before cy.window() we will get top
window object from cypress, where polly is not defined.

#### Recording cy.request

That is not possible as according to cypress docs cy.request
made via some internal module, not from browser, therefore in
code have to attach superagent to window in app/index.js (I thought
it should be attached on its own but for some reason that not happened
or maybe not happened fast enough), and then use following code:

```javascript

cy.url();
cy.window().its('superagent').then((superagent) => {
  return superagent
    .get('http://my.url')
    .set('X-HEADER', 'value')
    .send({ key: 'hello' });
}).then((response) => {
  expect(response.body).to.have.property('something');
});
```


#### Known limitations

Requests not get intercepted in before/beforeEach

Only one usage of cy.visit allowed, any further call to cy.visit cut
from saving prior made requests

Requests not get intercepted in cypress commands

Sometimes testing with cy:open showing tests passing offline, but
running in group after that with cy:e2e make some tests failed 
saying request aborted (perhaps somehow getting affected by previous tests)

When tried to use fetch adapter on polly and send fetch by following code:

```
cy.url();
cy.window().invoke('fetch', 'http://localhost:3000')

getting error from fetch adapter saying first argument must be String or
Buffer on some internal call, seems related with response header serialization,
reqeusts happend to be made as server logs it.
```
