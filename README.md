# @gulp-community/sass
> Process sass with [dart-sass](https://github.com/sass/dart-sass)

[![CI](https://github.com/binyamin/gulp-sass/actions/workflows/main.yml/badge.svg)](https://github.com/binyamin/gulp-sass/actions/workflows/main.yml)

## Usage
**Install**
```console
npm install @gulp-community/sass -D
```

**Use**
```js
import sass from '@gulp-community/sass';
function styles() {
    return gulp.src('main.scss') // or '**/*.scss'
        .pipe(sass({ /* dart-sass options*/ }))
        .pipe(gulp.dest('style.css'))
}
```

## Legal
All source-code is provided under the terms of [the MIT license](https://github.com/binyamin/gulp-sass/blob/main/LICENSE). Copyright 2021 Binyamin Aron Green.