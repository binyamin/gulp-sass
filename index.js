import PluginError from "plugin-error";
import deepmerge from "deepmerge";
import through from "through2";

import sass from 'sass';

/** @type {sass.Options} */
let sassOptions;
let plugin_name = "gulp-community/sass";

/**
 * @param {import("vinyl")} chunk also called "file"
 * @param {BufferEncoding} encoding
 * @param {through.TransformCallback} callback
 */
function _transformChunk(chunk, encoding, callback) {
    if(chunk.isNull()) {
        callback(null, chunk);
        return;
    }
    if (chunk.isStream()) {
        callback(new PluginError(plugin_name, 'Streaming not supported'));
        return;
    }

    const opts = deepmerge(sassOptions, {
        loadPaths: [
            chunk.base
        ]
    });

    try {
        const result = sass.compileString(chunk.contents.toString(), opts);
        chunk.contents = Buffer.from(result.css);
        callback(null, chunk);
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