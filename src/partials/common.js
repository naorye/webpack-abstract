import path from 'path';

export function common(sourceMap, nodeModulesPath, { aliasFilePath = undefined } = {}) {
    var alias;
    if (aliasFilePath) {
        try {
            alias = require(aliasFilePath).default;
            if (Object.keys(alias).length > 0) {
                console.log('===== RUNNING WITH ALIAS: =====');
                console.log(alias);
                console.log('=================================');
            }
        } catch (e) {
            alias = {};
        }
    }

    return {
        resolve: {
            extensions: [ '.js', '.json', '.jsx' ],
            alias
        },
        resolveLoader: {
            modules: [
                nodeModulesPath,
                path.join(__dirname, '../../node_modules')
            ]
        },
        devtool: sourceMap ? 'source-map' : '',
        devServer: {
            contentBase: './'
        }
    };
}
