import webpack from 'webpack';

export function definitions(data) {
    var definitions = {
        DEPLOY_DATE: JSON.stringify(new Date().toString()),
        ...data
    };

    return {
        plugins: [
            new webpack.EnvironmentPlugin({
                'NODE_ENV': undefined,
                'SKIP_CDN': false,
                'PRERENDER': false,
                'PRERENDER_CLIENT': false
            }),
            new webpack.DefinePlugin(definitions)
        ]
    };
}
