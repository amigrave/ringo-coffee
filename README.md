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

     -v --version  display the version number
     -h --help     Display help

From Ringo.js:

```javascript
var cs = require('ringo-coffee');
var javascript = cs.compile('(name)-> "Hello #{name}"');
var pows = cs.eval('[Math.pow num, 3 for num in [2,3,4]]');
cs.run('console.dir "-> #{i}" for i of global');
```

License
-------

This software is licensed under [the MIT license](http://opensource.org/licenses/MIT)
