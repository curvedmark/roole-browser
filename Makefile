VER = $(shell node -e "console.log(require('./node_modules/roole/package.json').version)")

roole.min.js: roole.js
	@echo '// Roole v$(VER) | roole.org | MIT license' > $@
	@node_modules/.bin/uglifyjs $< -vcm >> $@

roole.js: lib/bootstrap.js | node_modules
	@echo '/*' > $@
	@echo ' * Roole v$(VER) - A language that compiles to CSS' >> $@
	@echo ' * http://roole.org' >> $@
	@echo ' *' >> $@
	@echo ' * Copyright 2013 Glen Huang' >> $@
	@echo ' * Released under the MIT license' >> $@
	@echo ' */' >> $@
	@node_modules/.bin/browserify -s roole lib/bootstrap.js >>$@

node_modules:
	npm install

.PHONY: roole.js