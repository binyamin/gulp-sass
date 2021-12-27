# @gulp-community/sass
> Process sass with [dart-sass](https://github.com/sass/dart-sass)

[![CI](https://github.com/binyamin/gulp-sass/actions/workflows/main.yml/badge.svg)](https://github.com/binyamin/gulp-sass/actions/workflows/main.yml)

## Install
This plugin is not on NPM yet. Waiting to move it into [gulp-community](https://github.com/gulp-community). If you really want, you can install it via Git.

## Usage
"A code snippet is worth a thousand words" <sup>[citation needed]</sup>
```js
import sass from '@gulp-community/sass';

function styles() {
    return gulp.src('sass/main.scss') // or 'sass/**/*.scss'
        .pipe(sass({ /* dart-sass options*/ }))
        .pipe(gulp.dest('css')) // emits 'css/main.css'
}
```

## Common Workflows
### Indented Syntax
If the file's extension is `.sass`, the plugin will automatically set the `syntax` option to `indented`.

### Sourcemaps
For external source-maps, set the `sourceMap` option to `true`, like so.

```js
import sass from '@gulp-community/sass';

function styles() {
    return gulp.src('sass/main.scss', {
        sourcemaps: true
    })
    .pipe(sass({
        sourceMap: true
    }))
    .pipe(gulp.dest('css'), {
        sourcemaps: "."
    })
}
```

### Rename the output file
This plugin changes the file extension (`.scss` or `.sass`) to `.css`. For anything else, use a plugin like [gulp-rename](https://www.npmjs.com/package/gulp-rename).

## Legal
All source-code is provided under the terms of [the MIT license](https://github.com/binyamin/gulp-sass/blob/main/LICENSE). Copyright 2021 Binyamin Aron Green.