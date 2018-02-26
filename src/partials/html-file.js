import HtmlWebpackPlugin from 'html-webpack-plugin';

export function htmlFile(template, filename, options = {}) {
    return {
            plugins: [
                new HtmlWebpackPlugin({
                    template: template,
                    filename: filename,
                    inject: false,
                    ...options
                })
            ]
    };
}
