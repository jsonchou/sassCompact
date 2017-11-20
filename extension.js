"use strict";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var os = require('os');
var vscode = require('vscode');
//var window = vscode.window;
var commands = vscode.commands;

const level = 7; //max nest level

//unit event
var _unitEvt = function() {
    var config = vscode.workspace.getConfiguration('sassCompact');
    var editor = vscode.editor || vscode.window.activeTextEditor;
    var doc = editor.document;
    if (!editor) {
        return;
    }

    if (!doc) {
        return;
    }

    if (!(doc.languageId == 'scss' || doc.languageId == 'less')) {
        return;
    }

    if (doc.languageId == 'less' && !config.Less) {
        return;
    }

    var start = new vscode.Position(0, 0);
    var end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
    var range = new vscode.Range(start, end);
    var content = doc.getText(range);

    var res = content

        .replace(/(\;\ )+/g, ';')
        .replace(/\;/g, '; ')

    // fix animation style
    .replace(/\{\ 0%\ \{/g, '{ ' + os.EOL + ' 0% {')
        .replace(/\{\ from\ \{/g, '{ ' + os.EOL + ' from {')
        .replace(/\}\ to\ \{/g, '} ' + os.EOL + ' to {')
        .replace(new RegExp('; base64,', 'g'), ';base64,')

    // fix queryMedia style
    // .replace(/\)\ \{\ \./g, ')' + os.EOL + ' { ' + os.EOL + ' ' + '.')
    // .replace(/\)\ \{\ \#/g, ')' + os.EOL + ' { ' + os.EOL + ' ' + '#')
    // .replace(/\)\ \{\ \:/g, ')' + os.EOL + ' { ' + os.EOL + ' ' + ':')

    .replace(new RegExp(';' + os.EOL, 'g'), ';')
        .replace(new RegExp('{' + os.EOL, 'g'), '{')
        .replace(new RegExp(os.EOL + '}', 'g'), '}'); //end

    let flags = "%$~+>&*[:.#@";

    let labels = "a|b|p|q|s|canvas|caption|center|cite|code|col|colgroup|command|datalist|dd|del|details|dir|div|dfn|dialog|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h|i|kbd|keygen|label|legend|li|link|map|mark|menu|menuitem|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|rp|rt|ruby|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|wbr"

    //max level is six
    flags.split('').forEach(sub => {
        for (let i = level; i >= 1; i--) {
            res =
                res.replace(new RegExp(`\\;\\s{${4*i}}\\` + sub, 'g'), `;${os.EOL}${' '.repeat(4*i)}` + sub)
                .replace(new RegExp(`\\{\\s{${4*i}}\\` + sub, 'g'), `{${os.EOL}${' '.repeat(4*i)}` + sub)
        }
    })

    // labels
    labels.split('|').forEach(item => {
        for (let i = level; i >= 1; i--) {
            res =
                res.replace(new RegExp(`\\;\\s{${4*i}}` + item, 'g'), `;${os.EOL}${' '.repeat(4*i)}` + item)
                .replace(new RegExp(`\\ \\{\\s{${4*i}}` + item, 'g'), ` {${os.EOL}${' '.repeat(4*i)}` + item)
        }
    })

    let tags = "width|height|top|left|bottom|right|position|margin|padding|z-index|border|display|font|line|content|float|color|background|vertical|-webkit|-moz|-ms|-o|filter|opacity|box|text-|transition|cursor|animation|transform|letter|overflow|max-|min-|user|white|visibility|clear|direction|word|flex|align|justify|outline|orphans|widows|page-|clip|touch|pointer|resize|order|counter|list";
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

    "#$".split('').forEach(item => {
        res = res.replace(new RegExp(`\\:\\s{2,}\\${item}`, 'g'), `: ${item}`)
            // .replace(new RegExp(`\\;\\s*\\${item}`, 'g'), `; ${item}`)
            // .replace(new RegExp(`\\s{1}\\{\\s*\\${item}`, 'g'), ` { ${item}`)
    })

    "@extend|@mixin".split('|').forEach(item => {
        res = res.replace(new RegExp(`\\s{1}\\{\\s{2,}\\${item}`, 'g'), ` { ${item}`)
            .replace(new RegExp(`\\;\\{\\s{2,}\\${item}`, 'g'), `; ${item}`)
    })

    res = res.replace(new RegExp('\\;\\s*\\@import', 'g'), `;${os.EOL}@import`);

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