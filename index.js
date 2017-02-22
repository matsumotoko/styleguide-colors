/*
 * styleguide-colors
 * https://github.com/webdesignberlin/styleguide-colors
 *
 * Copyright (c) 2017 Frank Holder, Michael Gerstmann
 * Licensed under the MIT license.
 */

'use strict';

const _ = require('lodash');
const fs = require('fs');
const Options = require('./options');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

module.exports = function(opt) {

  const options = new Options(opt);

  const src = fs.readFileSync(options.sassPath, 'utf8');
  const markup = fs.readFileSync(options.templatePath, 'utf8');

  // generate markup via color definition file(s)
  let typeObj = {
      blockRegex: /\/\*\s?<@colors*(\S*)(\n|\r|.)*?\s?colors@>\s?\*\//igm,
      mapItemRegex: /\'([a-z0-9-_]-*)+\':\s?#[a-fA-F0-9]{3,6}/g,
      html: function (key, value) {
        return _.template(markup)({'key': key, 'value': value});
      }
    },
    html =
      `<!-- Generated via styleguide-colors -->
<${options.wrapper} class="sg-colors">
`,
    map,
    string;

  if(options.headline !== false){
    html += `    <h1>${options.headline}</h1>
`;
  }

  map = src.match(typeObj.blockRegex)[0];
  map = map.match(typeObj.mapItemRegex);

  for(let i = 0; i < map.length; i++) {
    string = map[i].replace(/\s/g, '');
    string = string.split(':');

    html += typeObj.html(string[0], string[1]);
  }

  //html += '</'+ options.wrapper +'>\n';
  html += `</${options.wrapper}>
`;
  if(!options.outputFile){
    return html;
  } else {
    /*fs.writeFile(__dirname + options.outputFile, html, (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });*/

    mkdirp(getDirName(options.outputFile), function (err) {
      if (err) return cb(err);

      fs.writeFile(options.outputFile, html, (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
      });
    });

  }
};
