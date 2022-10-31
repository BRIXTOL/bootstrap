# @brixtol/strap

Stripped down and customized [Bootstrap v5.2](https://getbootstrap.com/) variation with a refined set of styles and components. This module is used under the hood in our [webshop](https://brixtoltextiles.com).

**The bundle is refined for usage within our internal and public facing projects. This means that the included logic is developed for our web apps.**

### Key Features

- Small production bundle (20kb gzipped)
- Short version naming conventions
- Extended utilities
- Modular consumption, only what you need
- Stripped of Bootstrap's JavaScript components

### Why?

We here at [Brixtol Textiles](https://github.com/brixtol) leverage the bootstrap grid system and some of its utilities in various public facing web applications. We employ custom naming conventions for classes in order to keep production bundles small without needed to purge. It was extraneous having to constantly overwrite defaults together with the constant breaking changes of Bootstrap it made things difficult and we wanted a single point of control which we can depend upon.

## Install

```cli
pnpm add @brixtol/bootstrap -D
```

_Because [pnpm](https://pnpm.js.org/en/cli/install) is dope and does dope shit_

## Usage

When using this variation you can either either leverage its defaults or create a per-project `strap.scss` file to overwrite defaults. This flavor of Bootstrap is intended to be bundled along side project specific stylings, so the defaults are completely stripped of

#### Imports

The variations default variables overwrite bootstraps defaults. Projects which use

```scss
@import 'variables';
@import '~@brixtol/bootstrap';
```

## LICENSE

MIT
