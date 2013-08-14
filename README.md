# Fireplace

Fireplace is a packaged version of the Firefox Marketplace's front-end.

[![Build Status](https://travis-ci.org/mozilla/fireplace.png?branch=master)](https://travis-ci.org/mozilla/fireplace)


## Glossary

<dl>
  <dt><a href="https://github.com/mozilla/ashes">Ashes</a></dt>
  <dd>A secure debug information collection server</dd>

  <dt>Damper</dt>
  <dd>A node.js server that serves a browser-friendly version of Fireplace</dd>

  <dt><a href="https://github.com/mozilla/flue">Flue</a></dt>
  <dd>A mocked-out version of the Marketplace API.</dd>

  <dt>Hearth</dt>
  <dd>The source code for Fireplace.</dd>

  <dt>Inferno</dt>
  <dd>A build server which generates a packaged version of the Marketplace.</dd>

  <dt>Smoke Alarm</dt>
  <dd>A functional test runner for great justice.</dd>

  <dt>Yule Log</dt>
  <dd>A fake version of Fireplace to provide the Gaia team with a package that can
  be shipped and later upgraded to the real Fireplace.</dd>
</dl>


## Installation

Commbadge is based on [commonplace](https://github.com/mozilla/commonplace) and that is all you need to run commbadge.

Follow commonplace installation instructions on this page: https://github.com/mozilla/commonplace/blob/master/README.md

### Flue

Comprehensive Flue documentation can be found in
[Flue's README](https://github.com/mozilla/flue/blob/master/README.md).


### Yule Log

Docs can be found in
[Yule Log's README](https://github.com/mozilla/fireplace/blob/master/yulelog/README.md)

## Usage

Commonplace's `damper` can be used to run a test server and filesystem watcher.

For instructions on running Flue (the mock API server), please see the [Flue
docs](https://github.com/mozilla/flue/blob/master/README.md).


## Localizing

A detailed guide to extracting strings and creating JS language packs can be
found [on the wiki](https://github.com/mozilla/fireplace/wiki/L10n#extracting-strings).


## The API

[Read the docs.](http://firefox-marketplace-api.readthedocs.org/)


## Tests

Install casper

```bash
brew install casperjs
```

### Running unit tests

Load [http://localhost:8675/tests](http://localhost:8675/tests) in your browser.


### Running functional tests

Before you run the functional tests, make sure your `settings_local.js` file has
the subset of keys found in
[`settings_travis.js`](https://github.com/mozilla/fireplace/blob/master/hearth/media/js/settings_travis.js).

```bash
make test
```

## Local Development With Nginx

See [Using Fireplace with Zamboni](https://github.com/mozilla/fireplace/wiki/Using-Fireplace-with-Zamboni)
