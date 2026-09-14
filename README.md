# banking-qa-demo

Playwright and TypeScript test suite for ParaBank, a demo banking application. This repo aims to create automation tests for the app.


It runs locally in Docker rather than against the public ParaBank instance, so the suite
owns its own data and can assert on absolute values instead of deltas.

## What's here so far

Login tests. Still to come: page objects and layered fixtures, registration, transfers,
an API layer, cross-layer integration tests, AI-assisted test authoring with committed
context files, change-based test selection, and CI.

## Running it

You'll need Docker, Node 24.15.0, and Google Chrome
installed locally (see Decisions for why Chrome specifically).

1. Start ParaBank:
   `docker compose up -d`
   It opens up http://localhost:8080/parabank — give it a minute on first run

2. Register a user. The database starts empty, so go to
   http://localhost:8080/parabank/register.htm and create an account. The suite uses
   your own account rather than the default `demo`, so it isn't competing with
   anyone else's data.

3. Set up the environment:
   `cp .env.sample .env`
   Fill in `PARABANK_USER` and `PARABANK_PASS` with the account you just registered.
   For `PARABANK_CUSTOMER_ID`, get it from the api calls in the Network tab.

4. Install and run:
   `npm install
    npm test`
    
    Also available:
   - `npm run test:ui` — UI tests only
   - `npm run typecheck` — type check without running anything
   - `npm run report` — open the last HTML report

## Decisions

**Local Docker, not the public instance.** The public ParaBank is shared, so other
people's activity moves balances between your test steps. Running my own removes a whole
class of flakiness and lets me assert on absolute values.

**`channel: 'chrome'` rather than bundled Chromium.** Playwright's Chromium download kept
timing out against the CDN, so the suite runs against locally installed Chrome. This is a
known deviation, not a preference — CI will use bundled Chromium, and that difference is a
classic source of "passes locally, fails in CI". To be closed before CI goes in.

**Credentials are configuration, test data is not.** Valid credentials live in `.env` and
are never committed. Invalid passwords, unknown usernames and boundary values live in the
repo, because they're part of what the tests mean.

## Not covered

Deliberately out of scope: performance and load testing, visual regression, and cosmetic
assertions. This suite is about whether the application behaves correctly, not how it
looks or how fast it is.



   
