import path from 'node:path';
import { fileURLToPath } from 'node:url';

import test from 'ava';
import Vinyl from 'vinyl';
import pEvent from 'p-event';

import plugin from './index.js';

// See <https://github.com/sindresorhus/gulp-plugin-boilerplate/>

async function compile(filename, contents) {
	const stream = plugin();
	const promise = pEvent(stream, 'data');
	
	const dirname = fileURLToPath(import.meta.url);

	stream.end(new Vinyl({
		base: dirname,
		path: path.join(dirname, filename),
		contents: Buffer.from(contents)
	}));
	
	const file = await promise;
	return file;
}

test.todo('sass should compile correctly')
test.todo('sass should write sourcemaps')
test.todo('sass should not compile files prefixed with an underscore')