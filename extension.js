"use strict";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var os = require('os');
var vscode = require('vscode');
//var window = vscode.window;
var commands = vscode.commands;

//unit event
var _unitEvt = function() {
    var config = vscode.workspace.getConfiguration('sassCompact');
    var editor = vscode.editor || vscode.window.activeTextEditor;
    var doc = editor.document;
    if (!editor) {
        return;
    }

    // if (!doc || doc.languageId !== 'scss') {
    //     return;
    // }

    var start = new vscode.Position(0, 0);
    var end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
    var range = new vscode.Range(start, end);
    var content = doc.getText(range);

    var res = content

    // .replace(/(\;\ )+/g, ';')
    // .replace(/\}/g, ';}')
    // .replace(/\;+/g, ';')
    // .replace(/(\;\ )+/g, ';')
    // .replace(/\;/g, '; ')

    // .replace(/\s?\{/g, ' {') //"{" => " { "
    //     .replace(/\}/g, '}') //"}  " => "} "
    //     .replace(/\;/g, '; ') //";" => "; "
    //     .replace(/\ +\;/g, ';') //" ;" => ";"
    //     .replace(/\)\ +\{/g, ') {') //"){" => ") {"

    // .replace(/\ +/g, ' ') //remove multi empty
    // .replace(/\t+/g, '') //remove tab(U+0009)
    // .replace(/\v+/g, '') //remove tab(U+000B)

    // .replace(new RegExp('; ' + os.EOL, 'g'), ';')
    //     .replace(new RegExp('{ ' + os.EOL, 'g'), '{')
    //     .replace(new RegExp(os.EOL + '; }', 'g'), '; }')

    // fix animation style
        .replace(/\{\ 0%\ \{/g, '{ ' + os.EOL + ' 0% {')
        .replace(/\{\ from\ \{/g, '{ ' + os.EOL + ' from {')
        .replace(/\}\ to\ \{/g, '} ' + os.EOL + ' to {')
        .replace(new RegExp('; base64,', 'g'), ';base64,')

    // fix queryMedia style
    // .replace(/\)\ \{\ \./g, ')' + os.EOL + ' { ' + os.EOL + ' ' + '.')
    // .replace(/\)\ \{\ \#/g, ')' + os.EOL + ' { ' + os.EOL + ' ' + '#')
    // .replace(/\)\ \{\ \:/g, ')' + os.EOL + ' { ' + os.EOL + ' ' + ':')

    // .replace(new RegExp(os.EOL + ' {', 'g'), os.EOL + ' {' + os.EOL)
    // .replace(new RegExp(os.EOL + ' {' + os.EOL + ' ' + os.EOL + ' ', 'g'), '{' + os.EOL + ' ')

    // .replace(new RegExp(os.EOL + '\\ {4}' + ';}', 'g'), ';}')

    .replace(new RegExp(';' + os.EOL, 'g'), ';')
        .replace(new RegExp('{' + os.EOL, 'g'), '{')
        .replace(new RegExp(os.EOL + '}', 'g'), '}'); //end

    let flags = "%$~+>&*[:.#";

    let labels = "a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command|datalist|dd|del|details|dir|div|dfn|dialog|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|menu|menuitem|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video|wbr"

    let labelsExt = "#.:[,@*&";

    //max level is six
    flags.split('').forEach(sub => {
        res =
            res.replace(new RegExp('\\;\\s{24}\\' + sub, 'g'), `;${os.EOL}${' '.repeat(4*6)}` + sub)
            .replace(new RegExp('\\;\\s{20}\\' + sub, 'g'), `;${os.EOL}${' '.repeat(4*5)}` + sub)
            .replace(new RegExp('\\;\\s{16}\\' + sub, 'g'), `;${os.EOL}${' '.repeat(4*4)}` + sub)
            .replace(new RegExp('\\;\\s{12}\\' + sub, 'g'), `;${os.EOL}${' '.repeat(4*3)}` + sub)
            .replace(new RegExp('\\;\\s{8}\\' + sub, 'g'), `;${os.EOL}${' '.repeat(4*2)}` + sub)
            .replace(new RegExp('\\;\\s{4}\\' + sub, 'g'), `;${os.EOL}${' '.repeat(4*1)}` + sub);

        res =
            res.replace(new RegExp('\\{\\s{24}\\' + sub, 'g'), `{${os.EOL}${' '.repeat(4*6)}` + sub)
            .replace(new RegExp('\\{\\s{20}\\' + sub, 'g'), `{${os.EOL}${' '.repeat(4*5)}` + sub)
            .replace(new RegExp('\\{\\s{16}\\' + sub, 'g'), `{${os.EOL}${' '.repeat(4*4)}` + sub)
            .replace(new RegExp('\\{\\s{12}\\' + sub, 'g'), `{${os.EOL}${' '.repeat(4*3)}` + sub)
            .replace(new RegExp('\\{\\s{8}\\' + sub, 'g'), `{${os.EOL}${' '.repeat(4*2)}` + sub)
            .replace(new RegExp('\\{\\s{4}\\' + sub, 'g'), `{${os.EOL}${' '.repeat(4*1)}` + sub);
    })

    // labels
    labels.split('|').forEach(item => {
        res =
            res.replace(new RegExp('\\;\\s{24}' + item + '\\ \{', 'g'), `;${os.EOL}${' '.repeat(4*6)}` + item + " {")
            .replace(new RegExp('\\;\\s{20}' + item + '\\ \{', 'g'), `;${os.EOL}${' '.repeat(4*5)}` + item + " {")
            .replace(new RegExp('\\;\\s{16}' + item + '\\ \{', 'g'), `;${os.EOL}${' '.repeat(4*4)}` + item + " {")
            .replace(new RegExp('\\;\\s{12}' + item + '\\ \{', 'g'), `;${os.EOL}${' '.repeat(4*3)}` + item + " {")
            .replace(new RegExp('\\;\\s{8}' + item + '\\ \{', 'g'), `;${os.EOL}${' '.repeat(4*2)}` + item + " {")
            .replace(new RegExp('\\;\\s{4}' + item + '\\ \{', 'g'), `;${os.EOL}${' '.repeat(4*1)}` + item + " {");

        res =
            res.replace(new RegExp('\\ \\{\\s{24}' + item + '\\ \{', 'g'), ` {${os.EOL}${' '.repeat(4*6)}` + item + " {")
            .replace(new RegExp('\\ \\{\\s{20}' + item + '\\ \{', 'g'), ` {${os.EOL}${' '.repeat(4*5)}` + item + " {")
            .replace(new RegExp('\\ \\{\\s{16}' + item + '\\ \{', 'g'), ` {${os.EOL}${' '.repeat(4*4)}` + item + " {")
            .replace(new RegExp('\\ \\{\\s{12}' + item + '\\ \{', 'g'), ` {${os.EOL}${' '.repeat(4*3)}` + item + " {")
            .replace(new RegExp('\\ \\{\\s{8}' + item + '\\ \{', 'g'), ` {${os.EOL}${' '.repeat(4*2)}` + item + " {")
            .replace(new RegExp('\\ \\{\\s{4}' + item + '\\ \{', 'g'), ` {${os.EOL}${' '.repeat(4*1)}` + item + " {");

        labelsExt.split('').forEach(sub => {
            res =
                res.replace(new RegExp('\\ \\{\\s{24}' + item + '\\' + sub, 'g'), ` {${os.EOL}${' '.repeat(4*6)}` + item + sub)
                .replace(new RegExp('\\ \\{\\s{20}' + item + '\\' + sub, 'g'), ` {${os.EOL}${' '.repeat(4*5)}` + item + sub)
                .replace(new RegExp('\\ \\{\\s{16}' + item + '\\' + sub, 'g'), ` {${os.EOL}${' '.repeat(4*4)}` + item + sub)
                .replace(new RegExp('\\ \\{\\s{12}' + item + '\\' + sub, 'g'), ` {${os.EOL}${' '.repeat(4*3)}` + item + sub)
                .replace(new RegExp('\\ \\{\\s{8}' + item + '\\' + sub, 'g'), ` {${os.EOL}${' '.repeat(4*2)}` + item + sub)
                .replace(new RegExp('\\ \\{\\s{4}' + item + '\\' + sub, 'g'), ` {${os.EOL}${' '.repeat(4*1)}` + item + sub);

            res =
                res.replace(new RegExp('\\;\\s{24}' + item + '\\' + sub, 'g'), `;${os.EOL}${' '.repeat(4*6)}` + item + sub)
                .replace(new RegExp('\\;\\s{20}' + item + '\\' + sub, 'g'), `;${os.EOL}${' '.repeat(4*5)}` + item + sub)
                .replace(new RegExp('\\;\\s{16}' + item + '\\' + sub, 'g'), `;${os.EOL}${' '.repeat(4*4)}` + item + sub)
                .replace(new RegExp('\\;\\s{12}' + item + '\\' + sub, 'g'), `;${os.EOL}${' '.repeat(4*3)}` + item + sub)
                .replace(new RegExp('\\;\\s{8}' + item + '\\' + sub, 'g'), `;${os.EOL}${' '.repeat(4*2)}` + item + sub)
                .replace(new RegExp('\\;\\s{4}' + item + '\\' + sub, 'g'), `;${os.EOL}${' '.repeat(4*1)}` + item + sub);
        })

    })

    labelsExt.split('').forEach(sub => {
        res =
            res.replace(new RegExp('\\ \\{\\s{24}' + '\\' + sub, 'g'), ` {${os.EOL}${' '.repeat(4*6)}` + sub)
            .replace(new RegExp('\\ \\{\\s{20}' + '\\' + sub, 'g'), ` {${os.EOL}${' '.repeat(4*5)}` + sub)
            .replace(new RegExp('\\ \\{\\s{16}' + '\\' + sub, 'g'), ` {${os.EOL}${' '.repeat(4*4)}` + sub)
            .replace(new RegExp('\\ \\{\\s{12}' + '\\' + sub, 'g'), ` {${os.EOL}${' '.repeat(4*3)}` + sub)
            .replace(new RegExp('\\ \\{\\s{8}' + '\\' + sub, 'g'), ` {${os.EOL}${' '.repeat(4*2)}` + sub)
            .replace(new RegExp('\\ \\{\\s{4}' + '\\' + sub, 'g'), ` {${os.EOL}${' '.repeat(4*1)}` + sub);
    })

    let tags = "width|height|top|left|bottom|right|position|margin|padding|z-index|border|display|font|line|content|float|color|background|vertical|-webkit|-moz|-ms|-o|filter|opacity|box|text-|transition|cursor|animation|transform|letter|overflow|max-|min-|user|white|visibility|clear|direction|word|flex|align|justify|outline";
    tags.split('|').forEach(item => {
        res = res.replace(new RegExp('\\;\\s+' + item, 'g'), '; ' + item)
            .replace(new RegExp(`\\s{1}\\{\\s{2,24}${item}`, 'g'), ` { ${item}`)
    })

    //replace all blanks
    res = res.replace(new RegExp(`\\;\\s+\\}`, 'g'), `; }`)

    res = res.replace(new RegExp(`\\}\\}`, 'g'), `}${os.EOL}}`)

    // fix sass params
    "0|1|2|3|4|5|6|7|8|9|rgba|transform|calc|inherit|true|false".split('|').forEach(item => {
        res = res.replace(new RegExp(`\\:\\s{2,}${item}`, 'g'), `: ${item}`)
    })

    "$@".split('').forEach(item => {
        res = res.replace(new RegExp(`\\:\\s{2,}\\${item}`, 'g'), `: ${item}`)
            .replace(new RegExp(`\\;\\s*\\${item}`, 'g'), `; ${item}`)
            .replace(new RegExp(`\\s{1}\\{\\s*\\${item}`, 'g'), ` { ${item}`)
    })

    "@include|@extend|@mixin".split('|').forEach(item => {
        res = res.replace(new RegExp(`\\s{1}\\{\\s{2,}\\${item}`, 'g'), ` { ${item}`)
            .replace(new RegExp(`\\;\\{\\s{2,}\\${item}`, 'g'), `; ${item}`)
    })

    res = res.replace(new RegExp(`\\;\\s*\\$`, 'g'), `;${os.EOL}$`)
        // res = res.replace(new RegExp('\\;\\s*\\@', 'g'), `;${os.EOL}@`)

    if (res) {

        editor.edit(function(edit) {
            edit.replace(range, res);
        });

    }

    // Display a message box to the user
    //window.showInformationMessage('Hello World!');
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "sass-compact" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    context.subscriptions.push(commands.registerCommand('extension.sassCompact', function() {
        // The code you place here will be executed every time your command is executed
        _unitEvt();
    }));

}

// this method is called when your extension is deactivated
function deactivate() {}

exports.activate = activate;
exports.deactivate = deactivate;