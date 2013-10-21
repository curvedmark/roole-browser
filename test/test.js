test("relative url", function () {
	var styles = document.getElementsByClassName('roole-style');

	assert.equal(styles[0].textContent, [
		'#bg1 {',
		"	background: url(fixture/bg.png);",
		'}'
	].join('\n'));

	assert.equal(styles[1].textContent, [
		'#bg2 {',
		'	background: url(bg.png);',
		'}'
	].join('\n'));

	assert.equal(styles[2].textContent, [
		'#bg3 {',
		'	background: url(fixture/bg3/bg/bg.png);',
		'}'
	].join('\n'));

	assert.equal(styles[3].textContent, [
		'#bg4 {',
		'	background: url(bg.png);',
		'}'
	].join('\n'));
});

test("$img-size(path)", function (done) {
	var input = [
		'a {',
		"	content: $img-size('fixture/img.gif');",
		'}'
	].join('\n');
	var css = [
		'a {',
		'	content: 10px 5px;',
		'}'
	].join('\n');

	roole.compile(input, { filename: '/test/test.html' }, function (err, output) {
		if (err) return done(err);

		assert.equal(output, css);
		done();
	});
});