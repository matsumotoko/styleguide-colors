# styleguide-colors

> generate html markup to display a scss color map 

[![npm Package Version](https://img.shields.io/npm/v/styleguide-colors.svg?style=flat-square)](https://www.npmjs.com/package/styleguide-colors)
[![MIT License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](LICENSE)
[![Build Status](https://travis-ci.org/webdesignberlin/styleguide-colors.svg?branch=master)](https://travis-ci.org/webdesignberlin/styleguide-colors)

## Getting Started
Install

```shell
npm install styleguide-colors
```

### Usage

#### Basic Usage
Define a source file with a scss map like this:

```scss
/* <@colors */
$colors: (
    /// Color Black
    /// @group Colors
    /// @type Color
    'color-definition__black': #040d13,
    /// Color White
    /// @group Colors
    /// @type Color
    'color-definition__white': #ffffff,
    /// Color Gray
    /// @group Colors
    /// @type Color
    'color-definition__gray': #9e9e9e
);
/* colors@> */
```

`/* <@colors */` and `/* colors@> */` define the start- and endpoint of the color map.

 And use the following in the code.


```
var sc = require('styleguide-color');

var options = {
 separator: ',',
 headline: 'All my colors',
 wrapper: 'section',
 template: '',
 templatePath: '',
 sassPath: 'test/app/styles/_variables.scss'
};

sc(options);
```

The generated output:

```html
<!-- Generated via grunt-styleguide-colors -->
<section class="sg-colors">
<h1>All my colors</h1>
    <div class="sg-colors__definition">
        <div class="sg-colors__item" style="background: #040d13;"></div>
        <b>'color-definition__black':</b> #040d13
    </div>
    <div class="sg-colors__definition">
        <div class="sg-colors__item" style="background: #ffffff;"></div>
        <b>'color-definition__white':</b> #ffffff
    </div>
    <div class="sg-colors__definition">
        <div class="sg-colors__item" style="background: #9e9e9e;"></div>
        <b>'color-definition__gray':</b> #9e9e9e
    </div>
</section>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Nodeunit](https://github.com/caolan/nodeunit).
