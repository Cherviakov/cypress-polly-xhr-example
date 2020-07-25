### Example of using PollyJS with Cypress

Here is example of using PollyJS in Cypress when requests
sent via xhr (superagent library).

#### Setup

Polly setup take place in app/index.js and instance attached
to windows object. In Cypress in afterEach test need to add
following code:

```javascript
afterEach(() => {
  cy.reload();
  cy.url();
  cy.window().its('polly').invoke('stop');
});
```
If we not call cy.url() before cy.window() we will get top
window object from cypress, where polly is not defined.
If we invoke stop on polly instance and not reload page
then no further requests will get recorded, as polly instance
will be detached from all adapters.

#### Recording cy.request

That is not possible as according to cypress docs cy.request
made via some internal module, not from browser, therefore in
code have to attach superagent to window in app/index.js (I thought
it should be attached on its own but for some reason that not happened
or maybe not happened fast enough), and then use following code:

```javascript

cy.url();
cy.window().its('syperagent').then((superagent) => {
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

Seems all requests saved under same id, could be quite big response
even on  localhost if you try to save too many requests

Sometimes testing with cy:open showing tests passing offline, but
running in group after that with cy:e2e make some tests failed 
saying request aborted (perhaps somehow getting affected by previous tests)
