import PluginError from "plugin-error";
import deepmerge from "deepmerge";
import through from "through2";

import sass from 'sass';

/** @type {sass.Options} */
let sassOptions;
let plugin_name = "gulp-community/sass";

/**
 * @param {import("vinyl")} file also called "file"
 * @param {BufferEncoding} encoding
 * @param {through.TransformCallback} callback
 */
function _transformChunk(file, encoding, callback) {
    if(file.isNull()) {
        callback(null, file);
        return;
    }
    if (file.isStream()) {
        callback(new PluginError(plugin_name, 'Streaming not supported'));
        return;
    }

    const opts = deepmerge(sassOptions, {
        loadPaths: [
            file.base
        ]
    });

    try {
        // [1] Use Dart Sass to transform the file contents from SCSS to CSS
        const result = sass.compileString(file.contents.toString(), opts);
        
        // [2] Save the resulting CSS string to the file object
        file.contents = Buffer.from(result.css);
        
        
        callback(null, file);
    } catch (error) {
        callback(new PluginError(plugin_name, error));
    }
}

/**
 * @param {sass.Options} options Configuration, passed directly to the dart-sass compiler
 * @returns
 */
 function Plugin(options) {
    sassOptions = options;

    return through.obj(_transformChunk);
};

export default Plugin;