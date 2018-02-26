import CleanWebpackPlugin from 'clean-webpack-plugin';

export function clean(buildPath) {
    return {
        plugins: [
            new CleanWebpackPlugin([ buildPath ], {
                root: process.cwd()
            })
        ]
    };
}
