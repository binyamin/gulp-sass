import PluginError from "plugin-error";
import deepmerge from "deepmerge";
import through from "through2";

import sass from 'sass';

/** @type {sass.Options} */
let sassOptions;
let plugin_name = "@gulp-community/sass";

/**
 * @param {import("vinyl")} file also called "chunk"
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

    if(file.basename.startsWith("_")) {
        callback(null, null);
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
        
        // [3] Change the file extension to match the content-type
        file.extname = '.css';
        
        // [4] If a sourcemap was generated, add it to the file object/
        // Note: this must come after the extname has changed
        if(result.sourceMap) {
            file.sourceMap = result.sourceMap;
            file.sourceMap.file = file.relative;
        }
        
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