# roole-browser

Browser version of the Roole language

## Installation

Insert the `roole.min.js` file into the HTML. You can get it by:

- directly download it from this repo,

- install via `npm`

		npm install roole-browser

	and use `node_modules/roole-browser/roole.min.js`

## Example

```html
<script src="path/to/roole.min.js"></script>

<script>
	roole.compile(code, options, callback);
</script>
```

Roole files inserted with

```html
<link ref="stylesheet/roole" src="path/to/style.roo">
```

and Roole code embedded in

```html
<style type="text/roole">
	// roole code
</style>
```

will be automatically compiled and the compiled CSS will be automatically applied to the current page.