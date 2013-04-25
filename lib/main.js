include('ringo/term');

var sys = require('system');
var fs = require('fs');
var {CoffeeScript} = require('./coffee-script');
var {Parser} = require('ringo/args');
var {write, writeln} = require('ringo/term');

function usage() {
    var r = ["Usage: ringo-coffee [options] path/to/script.coffee"];
    r.push('');
    r.push("If called without options, `ringo-coffee` will run your script.");
    r.push('');
    return r.join('\n');
}

function main(args) {
    var parser = new Parser();
    //parser.addOption('b', 'bare', null, "compile without a top-level function wrapper");
    parser.addOption('v', 'version', null, 'display the version number');
    parser.addOption('h', 'help', null, 'Display help');
    args.shift();

    var options = parser.parse(args);
    if (options.help) {
        print(usage());
        print(parser.help());
    } else if (options.version) {
        print("CoffeeScript version 1.6.2 (running under Ringo.js)");
    } else {
        var file = args.shift();
        if (!file || !fs.exists(file)) {
            writeln(RED, "Error: file not found");
            writeln();
            writeln("Run with -h/--help to see ringo-coffee usage");
            sys.exit(1);
        }
        var src = fs.read(file);
        CoffeeScript.eval(src, {
            bare: true
        });
    }
}

if (require.main === module) {
    main(sys.args);
}

module.exports = CoffeeScript;
