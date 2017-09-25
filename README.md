# `stratic-handle-offset`

Return a properly configured [MomentJS][1] moment for a Stratic post

## Installation

    npm install stratic-handle-offset

## Usage

All this does is make sure that UTC offset information in Stratic posts is handled properly. This is pretty simple but is easy to forget to do (or to forget the details of how to do) - hence this module.

The module exports a single function. In order to use it, just pass the function the Stratic post's time information object (almost always `file.data.time`). You will get back a [MomentJS][1] moment with the offset information all set up so that when you call `moment#month()`, `moment#year()`, etc., everything Just Works™ and you get back accurate information.

## Example

```js
var handleOffset = require('stratic-handle-offset');
var through2 = require('through2');

through2.obj(function(file, enc, callback) {
	var date = handleOffset(file.data.time);
	// `date` is now a MomentJS moment; do with that what you will
	// E.g.:

	var year = date.year();
}
```

## Code of Conduct

Please note that StraticJS is developed under the [Contributor Covenant][2] Code of Conduct. Project contributors are expected to respect these terms.

For the full Code of Conduct, see [CODE_OF_CONDUCT.md][3]. Violations may be reported to <alex@strugee.net>.

## License

LGPL 3.0+

## Author

AJ Jordan <alex@strugee.net>

 [1]: http://momentjs.com/
 [2]: http://contributor-covenant.org/
 [3]: https://github.com/straticjs/stratic-handle-offset/blob/master/CODE_OF_CONDUCT.md
