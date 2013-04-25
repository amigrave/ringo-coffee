include('ringo/term');

var sys = require('system');
var fs = require('fs');
var {CoffeeScript} = require('./coffee-script');
var {Parser} = require('ringo/args');
var {write, writeln} = require('ringo/term');

function printUsage() {
    writeln("Usage: ringo-coffee [options] path/to/script.coffee");
    writeln();
    writeln("If called without options, `ringo-coffee` will run your script.");
    writeln();
}

function main(args) {
    var parser = new Parser();
    parser.addOption('b', 'bare', null, "compile without a top-level function wrapper");
    parser.addOption('c', 'compile', null, "compile to JavaScript and save as .js files");
    parser.addOption('h', 'help', null, 'Display help');
    parser.addOption('o', 'output', 'OUTPUT', 'set the output directory for compiled JavaScript');
    parser.addOption('p', 'print', null, 'print out the compiled JavaScript');
    parser.addOption('v', 'version', null, 'display the version number');
    args.shift();

    var options = parser.parse(args);
    if (options.help) {
        printUsage();
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
        if (options.compile) {
            var js = CoffeeScript.compile(src, { bare: options.bare });
            if (options.print) {
                print(js);
                sys.exit(0);
            }
            var outdir = fs.canonical(options.output || './');
            if (!fs.exists(outdir)) {
                fs.makeTree(outdir);
            }
            var jsfile = fs.base(file, '.coffee') + '.js'; // TODO: don't make assumption on extension
            fs.write(fs.join(outdir, jsfile), js);
        } else {
            CoffeeScript.run(src, { bare: options.bare });
        }
    }
}

if (require.main === module) {
    main(sys.args);
} else {
    // If not called by command line, setup the extention handler
    // for coffeescript files
    require.extensions['.coffee'] = function(resource) {
        return CoffeeScript.compile(resource.getContent(), { bare: true });
    };
}

module.exports = CoffeeScript;
