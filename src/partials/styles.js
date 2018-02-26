import ExtractTextPlugin from 'extract-text-webpack-plugin';
import deepExtend from 'deep-extend';

const cssLoaderDefaultOptions = {
    minimize: true,
    camelCase: true,
    modules: true,
    importLoaders: 2,
    url: true
};

export function styles({
    addSourceMap = false,
    cssPrefix = '',
    cssLoaderOptions = {},
    extract = false,
    extractFilename = '[name].css',
    includePaths = [],
    postCssPlugins = []
} = {}) {

    let cssUse = [
        {
            loader: 'css-loader',
            options: deepExtend({}, cssLoaderDefaultOptions, cssLoaderOptions, {
                sourceMap: addSourceMap,
                localIdentName: `${cssPrefix}[local]`
            })
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: function() {
                    return postCssPlugins;
                }
            }
        }
    ];

    let scssUse = [ ...cssUse, {
        loader: 'sass-loader',
        options: {
            includePaths
        }
    }];

    let lessUse = [ ...cssUse, {
        loader: 'less-loader',
        options: {
            includePaths
        }
    }];

    var plugins = [];

    if (extract) {
        cssUse = ExtractTextPlugin.extract({ use: cssUse });
        scssUse = ExtractTextPlugin.extract({ use: scssUse });

        plugins.push(
            new ExtractTextPlugin({ filename: extractFilename, allChunks: true })
        );
    } else {
        cssUse = [ 'style-loader', ...cssUse ];
        scssUse = [ 'style-loader', ...scssUse ];
        lessUse = [ 'style-loader', ...lessUse ];
    }

    plugins = plugins.length > 0 ? { plugins } : {};

    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: scssUse
                },
                {
                    test: /\.less$/,
                    use: lessUse
                },
                {
                    test: /\.css$/,
                    use: cssUse
                }
            ]
        },
        ...plugins
    };
}
