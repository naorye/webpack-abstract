import CopyWebpackPlugin from 'copy-webpack-plugin';

export function copy(patterns = [], options) {
    return {
        plugins: [
            new CopyWebpackPlugin(patterns, options)
        ]
    };
}
