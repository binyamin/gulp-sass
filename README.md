# @gulp-community/sass
> Process sass with [dart-sass](https://github.com/sass/dart-sass)

[![CI](https://github.com/binyamin/gulp-sass/actions/workflows/main.yml/badge.svg)](https://github.com/binyamin/gulp-sass/actions/workflows/main.yml)

## Usage
**Install**
```sh
npm install @gulp-community/sass -D
```

**Use**
```js
import sass from '@gulp-community/sass';

function styles() {
    return gulp.src('sass/main.scss') // or 'sass/**/*.scss'
        .pipe(sass({ /* dart-sass options*/ }))
        .pipe(gulp.dest('css')) // emits 'css/main.css'
}
```

### Common Workflows
<!-- TODO -->
<!-- #### Indented Syntax (`.sass`) -->

#### Sourcemaps
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

#### Rename the output file
This plugin changes the file extension (`.scss` or `.sass`) to `.css`. For anything else, use a plugin like [gulp-rename](https://www.npmjs.com/package/gulp-rename).

## Legal
All source-code is provided under the terms of [the MIT license](https://github.com/binyamin/gulp-sass/blob/main/LICENSE). Copyright 2021 Binyamin Aron Green.