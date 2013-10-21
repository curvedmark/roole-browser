var loader = require('floader');
var roole = require('roole');
var path = require('path-br');
var unindent = require('unindent');

module.exports = roole;

var sel = 'link[rel="stylesheet/roole"],style[type="text/roole"]';
var elems = document.querySelectorAll(sel);
var base = path.cwd();
var hasError;

for (var i = 0, len = elems.length; i < len; ++i) {
	var elem = elems[i];
	var style = document.createElement('style');
	style.className = 'roole-style'
	document.head.appendChild(style);

	var opts = { base: base };
	if (elem.nodeName === 'LINK') {
		var url = elem.getAttribute('href');
		url = path.resolve(path.getPath(url));
		opts.filename = url;
		compileFile(url, opts, style);
	} else {
		var content = unindent(elem.textContent);
		compile(content, opts, style);
	}
}

function compileFile(url, opts, style) {
	loader.load(url, function (err, content) {
		if (err) {
			displayError(err);
			throw err;
		}

		compile(content, opts, style);
	});
}

function compile(content, opts, style) {
	roole.compile(content, opts, function(err, css) {
		if (err) {
			displayError(err);
			throw err;
		}

		style.textContent = css;
	});
}

function displayError(err) {
	if (hasError) return;
	hasError = true;

	var div = document.createElement('div');
	div.textContent = err.name + ': ' + err.message;
	var msg = div.innerHTML;

	var loc, context;
	if (err.loc) {
		div.textContent = (err.loc.filename || '(embeded)') + ':' + err.loc.line + ':' + err.loc.column;
		loc = div.innerHTML;
		div.textContent = err.context();
		context = div.innerHTML;
	}

	var html = '<div id="roole-error-container">';
	html += '<div id="roole-error-msg">' + msg + '</div>';
	if (context) html += '<div id="roole-error-context">' + context + '</div>';
	if (loc) html += '<div id="roole-error-loc">' + loc + '</div>';
	html += '</div>';
	div.innerHTML = html;

	div.id = 'roole-error';
	document.body.appendChild(div);

	var style = document.createElement('style');
	document.head.appendChild(style);
	style.className = 'roole-style roole-error-style';

	style.textContent = '#roole-error{background:#eee;position:fixed;top:0;bottom:0;left:0;right:0;z-index:99999999;font:14px/normal Helvetica,Arial,san-serif}'
		+ '#roole-error-container{color:#000;background:#fff;position:absolute;top:50px;width:600px;left:50%;margin-left:-300px;border-radius:5px;box-shadow:0 1px 3px rgba(0,0,0,0.2)}'
		+ '#roole-error-msg{margin:20px 30px;color:#f50a36}'
		+ '#roole-error-context{margin:20px 30px;font-family:Menlo,Monaco,Consolas,"Lucida Console",monospace;white-space:pre;overflow:auto}'
		+ '#roole-error-loc{margin:20px 30px;color:#aaa}'
}