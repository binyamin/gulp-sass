import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import test from 'ava';
import Vinyl from 'vinyl';
import pEvent from 'p-event';

import plugin from './index.js';

// See <https://github.com/sindresorhus/gulp-plugin-boilerplate/>

/**
 * @param {string} folder
 * @returns {Promise<Vinyl>}
 */
async function compile(folder) {
	const dirname = path.dirname(fileURLToPath(import.meta.url));

	const stream = plugin({
		style: "compressed",
		sourceMap: true
	});
	const promise = pEvent(stream, 'data');
	
	const dir = path.join(dirname, 'fixtures', folder);
	const tree = await fs.readdir(dir, 'utf-8');

	for(const filename of tree) {
		const filepath = path.join(dir, filename);
		const contents = await fs.readFile(filepath, 'utf-8');

		stream.write(new Vinyl({
			cwd: dir,
			base: dir,
			path: filepath,
			contents: Buffer.from(contents)
		}));
	}
	
	stream.end();
	
	const file = await promise;
	return file;
}

test('sass should compile correctly', async t => {
	const file = await compile('simple');
	t.is(file.contents.toString(), 'body{color:red}');
})

test('sass should write sourcemaps', async t => {
	const file = await compile('simple');
	t.truthy(file.sourceMap);
})

test("resulting file should have `.css` extension", async t => {
	const file = await compile('simple');
	t.is(file.extname, '.css');
})

test('sass should not compile partials individually', async t => {
	const file = await compile('multiple');
	t.is(file.contents.toString(), 'body{color:red}html{font-size:112.5%}');
})

test('should use indented syntax based on file-extension', async t => {
	const file = await compile('indented');
	t.is(file.contents.toString(), 'body{color:red}');
})