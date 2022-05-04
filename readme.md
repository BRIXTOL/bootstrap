# @brixtol/bootstrap

Customized and extended [Bootstrap v5](https://getbootstrap.com/) variation.

### Why?

We here at [Brixtol](https://github.com/brixtol) leverage the bootstrap grid system and its utilities in various public facing web applications with custom naming convention for classes. We found it extraneous having to constantly overwrite defaults and wanted a single point of control which we can depend upon.

## Install

```cli
pnpm add @brixtol/bootstrap -D
```

_Because [pnpm](https://pnpm.js.org/en/cli/install) is dope and does dope shit_

## Usage

When using this variation you can either either leverage its defaults or create a per-project `variables.scss` file to overwrite defaults. This flavor of Bootstrap is intended to be bundled along side project specific stylings, so the defaults are completely stripped of presets.

##### Variables

We expose only a small portion of Bootstrap's variables and also include a couple of addition helpers variables. This variation is not using any JavaScript components so only bare essentials and exposed.

> Do not append `!default` to variables or else changes will not be written.

<!-- prettier-ignore -->
```scss
/* -------------------------------------------- */
/* EDITABLE OPTIONS                             */
/* -------------------------------------------- */

$enable-rfs:    true;

/* -------------------------------------------- */
/* PALETTE                                      */
/* -------------------------------------------- */

$white:         #ffffff;
$black:         #000000;
$blue:          #0d6efd;
$indigo:        #6610f2;
$purple:        #6f42c1;
$pink:          #d63384;
$red:           #dc3545;
$orange:        #fd7e14;
$yellow:        #ffc107;
$green:         #198754;
$teal:          #20c997;
$cyan:          #0dcaf0;

/* -------------------------------------------- */
/* GRAYS                                        */
/* -------------------------------------------- */

$gray-100:      #f8f8f8;
$gray-200:      #e0e4e7;
$gray-300:      #ccd3da;
$gray-400:      #b6c2ce;
$gray-500:      #98a5b3;
$gray-600:      #747d85;
$gray-700:      #575f68;
$gray-800:      #373d42;
$gray-900:      #202427;

/* -------------------------------------------- */
/* BACKGROUND COLORS                            */
/* -------------------------------------------- */

$background-colors: (
  "transparent": $transparent,
  "white": $white,
  "black": $black,
  "ivory": $gray-100,
  "gray": $gray-400
);

/* -------------------------------------------- */
/* FONT COLORS                                  */
/* -------------------------------------------- */

$font-colors: (
  "black": $black,
  "white": $white,
  "gray": $gray-500,
  "red": $red,
  "orange": $orange
);


/* -------------------------------------------- */
/* BUTTON COLORS                                */
/* -------------------------------------------- */

$button-colors: (
  "black": $black,
  "white": $white,
  "gray": $gray-500,
  "red": $red,
  "green": $green
);

/* -------------------------------------------- */
/* SPACING                                      */
/* -------------------------------------------- */

$spacer: 1rem;

/* -------------------------------------------- */
/* GRID                                         */
/* -------------------------------------------- */

$grid-columns:                12;
$grid-gutter-width:           1.5rem;
$grid-row-columns:            6;

/* -------------------------------------------- */
/* GRID > BREAKPOINTS                           */
/* -------------------------------------------- */

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);

/* -------------------------------------------- */
/* GRID > MAX-WIDTHS                            */
/* -------------------------------------------- */

$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px
);

/* -------------------------------------------- */
/* FONT FAMILY                                  */
/* -------------------------------------------- */

$font-family-heading:       Arial, sans-serif;
$font-family-body:          Helvetica, sans-serif;

/* -------------------------------------------- */
/* BODY                                         */
/* -------------------------------------------- */

$body-bg:                   $white;
$body-color:                $gray-900;

/* -------------------------------------------- */
/* FONT SIZES                                   */
/* -------------------------------------------- */

$font-size-base:              1rem;
$font-size-xs:                $font-size-base * .875;
$font-size-sm:                $font-size-base * .875;
$font-size-lg:                $font-size-base * 1.25;

/* -------------------------------------------- */
/* FONT HEADINGS                                */
/* -------------------------------------------- */

$headings-font-family:        $font-family-heading;
$headings-font-style:         null;
$headings-font-weight:        500 ;
$headings-line-height:        1.2 ;

/* -------------------------------------------- */
/* FONT WEIGHT                                  */
/* -------------------------------------------- */

$font-weight-normal:          400;
$font-weight-lighter:         100;
$font-weight-light:           300;
$font-weight-bold:            700;
$font-weight-bolder:          bolder;

/* -------------------------------------------- */
/* LINE HEIGHT                                  */
/* -------------------------------------------- */

$line-height-base:            1.5;
$line-height-sm:              1.25;
$line-height-lg:              2;
$line-height-xl:              2.4;

/* -------------------------------------------- */
/* LINKS                                        */
/* -------------------------------------------- */

$link-color:                  $black;
$link-decoration:             underline;
$link-shade-percentage:       20%;
$link-hover-decoration:       null;

/* -------------------------------------------- */
/* BORDERS                                      */
/* -------------------------------------------- */

$border-color:                $gray-300;
$border-radius:               .25rem;
$border-radius-sm:            .2rem;
$border-radius-lg:            .3rem;
$border-radius-pill:          50rem;

/* -------------------------------------------- */
/* SHADOWS                                      */
/* -------------------------------------------- */

$box-shadow:                  0 .5rem 1rem rgba($black, .15);
$box-shadow-sm:               0 .125rem .25rem rgba($black, .075);
$box-shadow-lg:               0 1rem 3rem rgba($black, .175);
$box-shadow-inset:            inset 0 1px 2px rgba($black, .075);

/* -------------------------------------------- */
/* HR LINE                                      */
/* -------------------------------------------- */

$hr-margin-y:                 $spacer;
$hr-color:                    inherit;
$hr-height:                   $border-width;
$hr-opacity:                  .25;

/* -------------------------------------------- */
/* ASPECT RATIOS                                */
/* -------------------------------------------- */

$aspect-ratios: (
  "1x1": 100%,
  "4x3": calc(3 / 4 * 100%),
  "16x9": calc(9 / 16 * 100%),
  "21x9": calc(9 / 21 * 100%)
);

/* -------------------------------------------- */
/* SPINNER                                      */
/* -------------------------------------------- */

$spinner-border-color:        $gray-300;
$spinner-height:              $spinner-width;
$spinner-height-sm:           $spinner-width-sm;
$spinner-width:               2rem;
$spinner-width-sm:            1rem;
$spinner-border-width:        .25em;
$spinner-border-width-sm:     .2em;
$spinner-vertical-align:      -.125em;
$spinner-animation-speed:     .75s;

/* -------------------------------------------- */
/* BUTTONS                                      */
/* -------------------------------------------- */

$btn-font-family:             $font-family-heading;
$btn-font-size-sm:            $font-size-sm;
$btn-font-size:               $font-size-base;
$btn-font-size-lg:            $font-size-lg;
$btn-line-height:             $line-height-base;
$btn-focus-color:             $transparent;
$btn-focus-width:             .25rem;
$btn-focus-opacity:           .25;
$btn-disabled-opacity:        .65;
$btn-padding-y-sm:            .25rem;
$btn-padding-y:               .375rem;
$btn-padding-y-lg:            .5rem;
$btn-padding-x-sm:            .5rem;
$btn-padding-x:               .75rem;
$btn-padding-x-lg:             1rem;
$btn-white-space:              nowrap; // Set null for text wrapping

```

#### Imports

The variations default variables overwrite bootstraps defaults. Projects which use

```scss
@import 'variables';
@import '~@brixtol/bootstrap';
```

## Version

Using Bootstrap [v5.1.1](https://getbootstrap.com/docs/5.0).

#### CONTAINER

- `.container-*`
- `.container-fluid`

#### ROW

- `.row`
- `.row-auto`
- `.row-cols-auto`
- `.row-cols-1`
- `.row-cols-2`
- `.row-cols-3`
- `.row-cols-4`
- `.row-cols-5`
- `.row-cols-6`

#### COLUMN

- `.col-*`
- `.col-*-auto`
- `.col-*-1`
- `.col-*-2`
- `.col-*-3`
- `.col-*-4`
- `.col-*-5`
- `.col-*-6`
- `.col-*-7`
- `.col-*-8`
- `.col-*-9`
- `.col-*-10`
- `.col-*-11`
- `.col-*-12`

#### COLUMN OFFSET

- `.offset-*-1`
- `.offset-*-2`
- `.offset-*-3`
- `.offset-*-4`
- `.offset-*-5`
- `.offset-*-6`
- `.offset-*-7`
- `.offset-*-8`
- `.offset-*-9`
- `.offset-*-10`
- `.offset-*-11`

#### POSITION

- `.relative`
- `.absolute`
- `.fixed`
- `.static`
- `.sticky`

#### FLEX

- `.flex-*-fill`
- `.flex-*-row`
- `.flex-*-row-reverse`
- `.flex-*-col`
- `.flex-*-col-reverse`

#### GAP <kbd>gap</kbd>

- `.gap-*-0`
- `.gap-*-1`
- `.gap-*-2`
- `.gap-*-3`
- `.gap-*-4`
- `.gap-*-5`

#### JUSTIFY CONTENT <kbd>justify-content</kbd>

- `.jc-*-start`
- `.jc-*-end`
- `.jc-*-center`
- `.jc-*-between`
- `.jc-*-around`
- `.jc-*-even`

#### ALIGN ITEMS <kbd>align-items</kbd>

- `.ai-*-start`
- `.ai-*-end`
- `.ai-*-center`
- `.ai-*-base`
- `.ai-*-stretch`

#### ALIGN CONTENT <kbd>align-content</kbd>

- `.ac-*-start`
- `.ac-*-end`
- `.ac-*-center`
- `.ac-*-between`
- `.ac-*-around`
- `.ac-*-stretch`

#### ALIGN SELF <kbd>align-self</kbd>

- `.as-*-auto`
- `.as-*-start`
- `.as-*-end`
- `.as-*-center`
- `.as-*-base`
- `.as-*-stretch`

#### DISPLAY <kbd>display</kbd>

- `.d-*-none`
- `.d-*-block`
- `.d-*-flex`
- `.d-*-grid`
- `.d-*-table`
- `.d-*-table-row`
- `.d-*-table-cell`
- `.d-*-inline`
- `.d-*-inline-block`
- `.d-*-inline-flex`

#### ORDER <kbd>order</kbd>

- `.od-*-first`
- `.od-*-last`
- `.od-*-1`
- `.od-*-2`
- `.od-*-3`
- `.od-*-4`
- `.od-*-5`
- `.od-*-6`

#### WIDTH <kbd>width: % | vw</kbd>

- `.w-auto`
- `.w-25`
- `.w-50`
- `.w-75`
- `.w-100`
- `.vw-100`

#### MAX WIDTH <kbd>max-width: %</kbd>

- `.mw-100`

#### HEIGHT <kbd>height: % | vw</kbd>

- `.h-auto`
- `.h-25`
- `.h-50`
- `.h-75`
- `.h-100`
- `.vh-100`

#### MAX HEIGHT <kbd>max-height: %</kbd>

- `.mh-100`

#### MARGIN <kbd>margin</kbd>

- `.m-*-auto`
- `.m-*-0`
- `.m-*-1`
- `.m-*-2`
- `.m-*-3`
- `.m-*-4`
- `.m-*-5`

#### MARGIN Y <kbd>margin: Y 0</kbd>

- `.my-*-auto`
- `.my-*-0`
- `.my-*-1`
- `.my-*-2`
- `.my-*-3`
- `.my-*-4`
- `.my-*-5`

#### MARGIN X <kbd>margin: 0 X</kbd>

- `.mx-*-auto`
- `.mx-*-0`
- `.mx-*-1`
- `.mx-*-2`
- `.mx-*-3`
- `.mx-*-4`
- `.mx-*-5`

#### MARGIN TOP <kbd>margin-top</kbd>

- `.mt-*-auto`
- `.mt-*-0`
- `.mt-*-1`
- `.mt-*-2`
- `.mt-*-3`
- `.mt-*-4`
- `.mt-*-5`

#### MARGIN RIGHT <kbd>margin-right</kbd>

- `.mr-*-auto`
- `.mr-*-0`
- `.mr-*-1`
- `.mr-*-2`
- `.mr-*-3`
- `.mr-*-4`
- `.mr-*-5`

#### MARGIN BOTTOM <kbd>margin-bottom</kbd>

- `.mb-*-auto`
- `.mb-*-0`
- `.mb-*-1`
- `.mb-*-2`
- `.mb-*-3`
- `.mb-*-4`
- `.mb-*-5`

#### MARGIN LEFT <kbd>margin-left</kbd>

- `.ml-*-auto`
- `.ml-*-1`
- `.ml-*-2`
- `.ml-*-3`
- `.ml-*-4`
- `.ml-*-5`

#### PADDING <kbd>padding</kbd>

- `.p-*-auto`
- `.p-*-0`
- `.p-*-1`
- `.p-*-2`
- `.p-*-3`
- `.p-*-4`
- `.p-*-5`

###### PADDING Y <kbd>padding: Y 0</kbd>

- `.py-*-auto`
- `.py-*-0`
- `.py-*-1`
- `.py-*-2`
- `.py-*-3`
- `.py-*-4`
- `.py-*-5`

###### PADDING X <kbd>padding: 0 X</kbd>

- `.px-*-auto`
- `.px-*-0`
- `.px-*-1`
- `.px-*-2`
- `.px-*-3`
- `.px-*-4`
- `.px-*-5`

#### PADDING TOP <kbd>padding-top</kbd>

- `.pt-*-auto`
- `.pt-*-0`
- `.pt-*-1`
- `.pt-*-2`
- `.pt-*-3`
- `.pt-*-4`
- `.pt-*-5`

#### PADDING RIGHT <kbd>padding-right</kbd>

- `.pr-*-auto`
- `.pr-*-0`
- `.pr-*-1`
- `.pr-*-2`
- `.pr-*-3`
- `.pr-*-4`
- `.pr-*-5`

#### PADDING BOTTOM <kbd>padding-bottom</kbd>

- `.pb-*-auto`
- `.pb-*-0`
- `.pb-*-1`
- `.pb-*-2`
- `.pb-*-3`
- `.pb-*-4`
- `.pb-*-5`

#### PADDING LEFT <kbd>padding-left</kbd>

- `.pl-*-auto`
- `.pl-*-1`
- `.pl-*-2`
- `.pl-*-3`
- `.pl-*-4`
- `.pl-*-5`

#### BACKGROUND COLOR <kbd>background-color</kbd>

- `.bg-transparent`
- `.bg-white`
- `.bg-black`
- `.bg-ivory`
- `.bg-gray`

#### LINE HEIGHT <kbd>line-height</kbd>

- `.lh-*-1`
- `.lh-*-2`
- `.lh-*-3`
- `.lh-*-4`
- `.lh-*-5`

#### FONT SIZE <kbd>font-size</kbd>

- `.fs-1`
- `.fs-2`
- `.fs-3`
- `.fs-4`
- `.fs-5`
- `.fs-xs`
- `.fs-sm`
- `.fs-md`
- `.fs-lg`

#### FONT COLOR <kbd>font-color</kbd>

- `.fc-black`
- `.fc-white`
- `.fc-gray`
- `.fc-red`
- `.fc-orange`
- `.fc-green`

#### FONT STYLE<kbd>font-style</kbd>

- `.italic`
- `.strike`

#### FONT WEIGHT <kbd>font-weight</kbd>

- `.fw-light`
- `.fw-lighter`
- `.fw-normal`
- `.fw-bold`
- `.fw-bolder`

#### TEXT TRANSFORM <kbd>text-transform</kbd>

- `.lower`
- `.upper`
- `.upcase`
- `.uncase`

#### TEXT ALIGN <kbd>text-align</kbd>

- `.tl-*`
- `.tc-*`
- `.tr-*`
- `.tj-*`

#### TEXT DECORATION <kbd>text-decoration</kbd>

- `.underline`
- `.strike`
- `.undecorate`

#### BORDER <kbd>border</kbd>

- `.bd`
- `.bd-0`

#### BORDER WIDTH <kbd>border-width</kbd>

- `.bd-1`
- `.bd-2`
- `.bd-3`
- `.bd-2`
- `.bd-4`
- `.bd-5`

#### BORDER TOP <kbd>border-top</kbd>

- `.bd-top`
- `.bd-top-0`

#### BORDER RIGHT <kbd>border-right</kbd>

- `.bd-right`
- `.bd-right-0`

#### BORDER BOTTOM <kbd>border-bottom</kbd>

- `.bd-bottom`
- `.bd-bottom-0`

#### BORDER BOTTOM <kbd>border-left</kbd>

- `.bd-left`
- `.bd-left-0`

#### BORDER RADIUS <kbd>border-radius</kbd>

- `.rad`
- `.rad-1`
- `.rad-2`
- `.rad-3`
- `.rad-pill`
- `.rad-circle`
- `.rad-top`
- `.rad-right`
- `.rad-bottom`
- `.rad-left`

#### SPINNER

- `.spinner`
- `.spinner-sm`

#### BUTTONS

- `.btn`
- `.btn-sm`
- `.btn-lg`
- `.btn-href`
- `.btn-check`

#### BUTTON COLORS

- `.btn-black`
- `.btn-white`
- `.btn-gray`
- `.btn-red`
- `.btn-green`

#### BUTTON OUTLINE

- `.btn-outline-black`
- `.btn-outline-white`
- `.btn-outline-gray`
- `.btn-outline-red`
- `.btn-outline-green`

#### FORM LABEL <kbd>label</kbd>

- `.form-label`
- `.form-label-col`
- `.form-label-col-sm`
- `.form-label-col-lg`

#### FORM INPUT <kbd>input</kbd>

- `.form-control`
- `.form-floating`
- `.form-control-lg`
- `.form-control-sm`

#### FORM COLOR <kbd>color</kbd>

- `.form-color`

#### FORM SELECT <kbd>select</kbd>

- `.form-select`
- `.form-select-sm`
- `.form-select-lg`

#### FORM CHECK <kbd>checkbox</kbd>

- `.form-check`
- `.form-check-label`
- `.form-check-input`
- `.form-check-inline`

#### FORM SWITCH <kbd>radio</kbd>

- `.form-switch`
- `.form-check-label`
- `.form-check-input`
- `.form-select-lg`

#### FORM RANGE <kbd>range</kbd>

- `.form-range`

#### FORM VALIDATE

- `.form-valid`
- `.form-invalid`
- `.form-error`
- `.form-success`

#### FORM INPUT GROUP

- `.input-group`
- `.input-group-sm`
- `.input-group-lg`

## LICENSE

MIT
