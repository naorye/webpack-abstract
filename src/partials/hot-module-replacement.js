import webpack from 'webpack';

export function hotModuleReplacement(options = {}) {
    return {
        plugins: [
            new webpack.HotModuleReplacementPlugin(options)
        ]
    };
}
