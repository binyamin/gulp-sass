import PluginError from "plugin-error";
import deepmerge from "deepmerge";
import through from "through2";

import sass from 'sass';

/**
 * @type {import("sass").StringOptions<"sync">}
 */
let sassOptions;
let plugin_name = "@gulp-community/sass";

/**
 * @param {import("vinyl")} file also called "chunk"
 * @param {BufferEncoding} encoding
 * @param {import("through2").TransformCallback} callback
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

    // NOTE: deepmerge gives precendence to the last argument, so we set that
    // to the user's preferences
    const opts = deepmerge({
        loadPaths: [
            file.base
        ],
        syntax: (file.extname === ".sass" ? "indented" : "scss")
    }, sassOptions);

    try {
        // [1] Use Dart Sass to transform the file contents from SCSS to CSS
        const result = sass.compileString(file.contents.toString(), opts);
        
        // [2] Save the resulting CSS string to the file object
        file.contents = Buffer.from(result.css);
        
        // [3] Change the file extension to match the content-type
        file.extname = '.css';
        
        // [4] If a sourcemap was generated, add it to the file object/
        // Note: this must come after the file-extension has changed
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
 * Process sass with dart-sass
 * 
 * @param {import("sass").StringOptions<"sync">} [options] Configuration, passed directly to the dart-sass compiler
 * @returns {import("node:stream").Transform}
 */
function GulpSass(options={}) {
    sassOptions = options;

    return through.obj(_transformChunk);
};

export default GulpSass;