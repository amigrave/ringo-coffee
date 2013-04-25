CoffeeScript handler for Ringo.js
=================================

**ringo-coffee** is a [CoffeeScript](http://coffeescript.org) handler/compiler/runner for [Ringo.js](http://ringojs.org)

Installation
------------

    ringo-admin install amigrave/ringo-coffee

Usage
-----

From the shell:

    $ ringo-coffee -h

    Usage: ringo-coffee [options] path/to/script.coffee

    If called without options, `ringo-coffee` will run your script.

     -b --bare           compile without a top-level function wrapper
     -c --compile        compile to JavaScript and save as .js files
     -h --help           Display help
     -o --output OUTPUT  set the output directory for compiled JavaScript
     -p --print          print out the compiled JavaScript
     -v --version        display the version number

From Ringo.js:

```javascript
var cs = require('ringo-coffee');

var pows = cs.eval('[Math.pow num, 3 for num in [2,3,4]]');
    // [ [ 8, 27, 64 ] ]

var js = cs.compile('(name)-> "Hello #{name} !"', { bare: true });
    // (function(name) {
    //   return "Hello " + name + " !";
    // });

cs.run('console.dir "-> #{i}" for i of global');
```

License
-------

This software is licensed under [the MIT license](http://opensource.org/licenses/MIT)
