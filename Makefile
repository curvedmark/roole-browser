VER = $(shell node -e "console.log(require('./node_modules/roole/package.json').version)")

roole.js: | node_modules
	@echo '// Roole $(VER) | roole.org | MIT license' > $@
	@node_modules/.bin/browserify -r roole -r floader -r path-extras >>$@
	@echo '!function() {' >> $@
	@cat lib/bootstrap.js >> $@
	@echo '}();' >> $@
	@node_modules/.bin/uglifyjs $@ -vcm --comments '/^ Roole/' -o $@

node_modules:
	npm install

.PHONY: roole.js