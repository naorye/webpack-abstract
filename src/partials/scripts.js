import webpack from 'webpack';
import deepExtend from 'deep-extend';

const uglifyDefaultOptions = {
    sourceMap: false,
    mangle: true,
    minimize: true,
    compress: {
        sequences: true, // join consecutive statemets with the “comma operator”
        properties: true, // optimize property access: a["foo"] → a.foo
        dead_code: true, // discard unreachable code
        drop_debugger: true, // discard “debugger” statements
        unsafe: false, // some unsafe optimizations (see below)
        conditionals: true, // optimize if-s and conditional expressions
        comparisons: true, // optimize comparisons

        // In order to enable "evaluate", uglify-js@2.7.3 should be used since
        // it's latest version cause an issue when uglify core-js. Instead of
        // "<"+"/script>", uglify-js with evaluate:true converts it to "</script>"
        // and this cause an issue when inlining the script.
        evaluate: true, // evaluate constant expressions
        booleans: true, // optimize boolean expressions
        loops: true, // optimize loops
        unused: true, // drop unused variables/functions
        hoist_funs: true, // hoist function declarations
        hoist_vars: false, // hoist variable declarations
        if_return: true, // optimize if-s followed by return/continue
        join_vars: true, // join var declarations
        cascade: true, // try to cascade `right` into `left` in sequences
        side_effects: true, // drop side-effect-free statements
        warnings: true, // warn about potentially dangerous optimizations/code
        global_defs: {} // global definitions
    }
};

const babelLoaderDefaultQuery = {
    babelrc: true,
    cacheDirectory: true
};

export function scripts({
    uglifyOptions = false,
    babelLoaderQuery = {},
    babelLoaderExclude = [ /node_modules/ ],
    addSourceMap = false
} = {}) {
    const shouldUglify = !!uglifyOptions;
    return {
        plugins: [
            ...(() => {
                return shouldUglify ? [
                    new webpack.LoaderOptionsPlugin({
                        minimize: true
                    })
                ] : [];
            })(),
            ...(() => {
                return shouldUglify ? [
                    new webpack.optimize.UglifyJsPlugin(
                        deepExtend({}, uglifyDefaultOptions, uglifyOptions, {
                            sourceMap: addSourceMap
                        })
                    )
                ] : [];
            })()
        ],
        module: {
            rules: [
                ...(() => {
                    return addSourceMap ? [
                        {
                            test: /\.jsx?$/,
                            enforce: 'pre',
                            use: [ 'source-map-loader' ]
                        }
                    ] : [];
                })(),
                {
                    test: /\.jsx?$/,
                    exclude: babelLoaderExclude,
                    use: [
                        {
                            loader: 'babel-loader',
                            query: deepExtend({}, babelLoaderDefaultQuery, babelLoaderQuery)
                        }
                    ]
                }
            ]
        }
    };
}
