'use strict';
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/


/**
 * options for tests
 *
 * @type {{separator: string, headline: string, wrapper: string, html: string -path to template}}
 */
const fs = require('fs');
const Options = require('../options');
const options = new Options();

options.sassPath = 'test/app/styles/_variables.scss';

exports.styleguide_colors = {
  'does main file exist': function(test) {
    test.expect(1);
    let exists = true;

    try {
      let main = require('../index');
    } 
    catch(e) {
      exists = false;
    }

    test.ok(exists, 'main file not found and can not be required');

    test.done();
  },
  'does sccs file exist': function(test) {
    test.expect(1);
    let result = true;

    fs.readFile(options.sassPath, 'utf8', (err, data) => {
      if(!err){
        test.ok(result, 'the scss file can not be found or is empty');
        test.done();
      } else {
        result = false;
      }
    });

  },
  'is sccs file content a string': function(test) {
    test.expect(1);
    let result = true;

    fs.readFile(options.sassPath, 'utf8', (err, data) => {
      if(!err && (typeof data === 'string')){
        test.ok(result, 'the scss file does not contain a string');
        test.done();
      } else {
        result = false;
      }
    });
  },
  'does the script throw any errors': function(test) {
    test.expect(1);

    let runApp = require('../index');

    function validate() {
      try {
        runApp(options);
      }
      catch(e) {
        throw new Error(e);
      }
    }

    test.doesNotThrow(validate);
    test.done();
  },
  'does the script return a string': function(test) {
    test.expect(1);

    let runApp = require('../index');
    let html;
    let result;

    try {
      html = runApp(options);
    }
    catch(e) {
      result = false;
    }
    result = typeof html === 'string';

    test.ok(result, 'no output generated');
    test.done();
  }
};
