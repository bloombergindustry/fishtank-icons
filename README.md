# Fishtank Icons

SVG icons for use with the Fishtank Design System.

On build, any icon in [`src`](src/) will be optimized using [`svgo`](https://github.com/svg/svgo) and saved to `icons`. We (will) maintain an NPM package with this step already done called `@fishtank/icons`.

## Installation

```sh
npm install @fishtank/icons
```

## Usage

If your project depends on `@fishtank/icons`, you'll be able to refer to the contents of the `icons` directory. How you'll do this will depend on your choice of build system or deployment mechanism. At this point, our adopters on using Webpack. If you are using something else, please let us know and we'll update this accordingly.

### With Webpack

We recommend using [`SVG Sprite Loader`] (https://github.com/kisenka/svg-sprite-loader). This loader support a [number of different strategies](http://kisenka.me/svg-sprite-loader/examples/). We've had success with the default runtime.

If you are working with Vue JS, we have built [@fishtank/icons-vue](https://www.npmjs.com/package/@fishtank/icons-vue), a Vue Component that renders our SVG shapes.

Note that external sprites cannot be used with CDNs or asset hosts due to cross-origin restrictions.

## Opinions

### SVG vs. Font Icons

Early on, we decided in favor of using SVG sprites instead of font icons for our design system. To summarize the key points:

1. SVGs are now well supported across our target browsers (sometimes with minor polyfills).
2. Font icons have a number of accessibility issues.
3. Font icons will fail with no fallback when font downloads are restricted (as we've seen at a number of government agencies).

More information here: [Seriously Don't Use Icon Fonts](https://cloudfour.com/thinks/seriously-dont-use-icon-fonts/)

### Sizing

We support two different icon sizes: 24px and 32px. Although SVG allows our icons to be infinitely scalable, the icons have been designed to be crisp and not have sub-pixels at those sizes (or integer multiples thereof).

_In the future, we may figure out a way to make the icons responsive to the size they're used in._

### Accessibility

When dealing with icon accessibility, we follow the advice in this article: [Hiding inline SVG icons from screen readers](http://www.456bereastreet.com/archive/201609/hiding_inline_svg_icons_from_screen_readers/)

> Many, probably the majority, of articles explaining how to use inline SVG for icons describe multiple ways of ensuring that your SVG graphics have a text alternative. That can be appropriate, but most of the time, at least in my experience, you just want an icon as an added visual cue alongside some text. Just like adding an image via the background-image CSS property. And icons of that kind should not have any text alternative since for a screen reader user that will just duplicate the information already available in plain text.

* We strip `title` elements from the SVGs before packaging them.
* We recommend that anyone using our icons
    * add `aria-hidden="true"` to the `<svg>` element
    * add accessible descriptive text to the context that our icons are being used in

## Optimizations

Currently, we use [SVGO's default optimization settings](https://github.com/svg/svgo/blob/master/.svgo.yml), but we're open to suggestions.