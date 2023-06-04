# @brixtol/bootstrap

Stripped down and customized [Bootstrap v5](https://getbootstrap.com/) variation with a refined set of styles and components. This module is used under the hood in our [webshop](https://brixtoltextiles.com).

**The bundle is refined for usage within our internal and public facing projects. This means that the included logic is developed for our web applications.**

> **Note**
>
> _You are free to leverage and use the variation but the project will not accept feature requests, only bug reporting or issues._

### Key Features

- Small production bundle (20kb gzipped)
- Short version naming conventions
- Extended utilities
- Modular consumption, only what you need
- Stripped of Bootstrap's JavaScript components

### Why?

We here at [Brixtol Textiles](https://github.com/brixtol) leverage the bootstrap grid system and some of its utilities in various public facing web applications. We employ custom naming conventions for classes in order to keep production bundles small without needing to purge. It was extraneous having to constantly overwrite defaults together with the constant breaking changes of Bootstrap it made things difficult and we wanted a single point of control which we can depend upon while still being able to extend the base to our requirements.

# Install

```cli
pnpm add @brixtol/bootstrap -D
```

_Because [pnpm](https://pnpm.js.org/en/cli/install) is dope and does dope shit_

# Usage

When using this variation you can either either leverage its defaults or create a per-project `strap.scss` file to overwrite defaults. This flavor of Bootstrap is intended to be bundled along side project specific stylings, so the defaults are completely stripped and largely refactored. The main `sass/*` directory contains all the overwrites and refactors, the `sass/bootstrap/*` directory contains the hard-fork of Bootstrap and the `_` prefixed files in the root of this directory are import facing.

Usage is considered on a per-project basis. Below are the main approaches we employ.

### Full Import

This will pull in the entire variation.

```scss
// FULL IMPORT
//
@import '@brixtol/bootstrap';
```

### Variation Import

This import method **requires** the base `variables.scss` file to be imported. The `variation.scss` import includes a full import of variation. This method is used when you want to apply variable overwrites.

<!--prettier-ignore-->
```scss
@import '@brixtol/bootstrap/variables';     // DEFAULT VARIABLES FIRST

// VARIABLE OVERWRITES
//
$some-variable: null;

@import '@brixtol/bootstrap/variation';     // VARIATION IMPORT
```

### Customized Import

This import method **requires** the base `variables.scss` file to be imported first. The additional files can be included on a per-requirement level. This method is used for producing a more refined distribution bundle.

<!--prettier-ignore-->
```scss
@import '@brixtol/bootstrap/variables';     // DEFAULT VARIABLES FIRST

// CUSTOM VARIABLES
//
@import 'custom-variables';

@import '@brixtol/bootstrap/base';          // BASE IMPORT
@import '@brixtol/bootstrap/forms';         // FORMS IMPORT
@import '@brixtol/bootstrap/components';    // COMPONENTS IMPORT
```

### Cherry Picking Import

This import method **requires** the base `variables.scss` file to be imported first. You can cherry-pick the entire variation from here and include any customizations. This method is used for fine grained control over the distribution bundle.

<!--prettier-ignore-->
```scss
@import '@brixtol/bootstrap/variables';     // DEFAULT VARIABLES FIRST

// CUSTOM VARIABLES
//
@import 'custom-variables';

/* GRID ---------------------------------------- */

@import "@brixtol/bootstrap/sass/grid";

/* BASE ---------------------------------------- */

@import "@brixtol/bootstrap/sass/headings";
@import "@brixtol/bootstrap/sass/code";
@import "@brixtol/bootstrap/sass/spacing";
@import "@brixtol/bootstrap/sass/display";
@import "@brixtol/bootstrap/sass/helpers";
@import "@brixtol/bootstrap/sass/flex";
@import "@brixtol/bootstrap/sass/backgrounds";
@import "@brixtol/bootstrap/sass/text";
@import "@brixtol/bootstrap/sass/font";
@import "@brixtol/bootstrap/sass/sizing";
@import "@brixtol/bootstrap/sass/lists";
@import "@brixtol/bootstrap/sass/links";
@import "@brixtol/bootstrap/sass/borders";
@import "@brixtol/bootstrap/sass/radius";
@import "@brixtol/bootstrap/sass/spinner";
@import "@brixtol/bootstrap/sass/buttons";
@import "@brixtol/bootstrap/sass/tooltip";
@import "@brixtol/bootstrap/sass/ratio";

/* COMPONENTS -------------------------------- */

@import "@brixtol/bootstrap/sass/components/dropdown";
@import "@brixtol/bootstrap/sass/components/accordion";
@import "@brixtol/bootstrap/sass/components/modal";

/* FORMS -------------------------------------- */

@import "@brixtol/bootstrap/sass/forms/labels";
@import "@brixtol/bootstrap/sass/forms/text";
@import "@brixtol/bootstrap/sass/forms/input";
@import "@brixtol/bootstrap/sass/forms/dropdown";
@import "@brixtol/bootstrap/sass/forms/check";
@import "@brixtol/bootstrap/sass/forms/color";
@import "@brixtol/bootstrap/sass/forms/switch";
@import "@brixtol/bootstrap/sass/forms/select";
@import "@brixtol/bootstrap/sass/forms/range";
@import "@brixtol/bootstrap/sass/forms/float";
@import "@brixtol/bootstrap/sass/forms/group";
@import "@brixtol/bootstrap/sass/forms/number";
@import "@brixtol/bootstrap/sass/forms/feedback";
@import "@brixtol/bootstrap/sass/forms/validation";

```

# LICENSE

MIT
