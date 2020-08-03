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

#### Setup second way

For some reason on working project first way not worked.
Variation of previously posted solution appear to be working
with some limitations, namely:

1. Setup Polly in website/app/index.js
2. Test name set in cypress on cy.visit onBeforeLoad hook
3. Use cy.reload in afterEach hook after stop polly

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

Recording made during pass individual tests with cy:open may make tests
not pass when run with cy:e2e, as it seems requests made are not equal.

The bigger recording size bigger cy.wait() value need to use after each
view loading/sending data (e.g. with recording around 3Mb have to use
cy.wait(5000))

For unknown reason some of POST and PUT requests not get recorded, therefore
logic related to update view after such request may not be tested

When tried to use fetch adapter on polly and send fetch by following code:

```
cy.url();
cy.window().invoke('fetch', 'http://localhost:3000')
```

getting error from fetch adapter saying first argument must be String or
Buffer on some internal call, seems related with response header serialization,
requests happened to be made as server logs it.
https://github.com/Netflix/pollyjs/issues/354

#### My comment

After all this work I believe that cypress and pollyjs should not be used
together, unless there some very good reason for that. Limitations made with
use of pollyjs are too hard and additional efforts made to allow tests passing
only make them run longer and there no assurance that there will be no other
strange error on the way, either from cypress of from pollyjs.
