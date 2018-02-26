export function file(extensions = [], useRelativePath = true) {
    return {
        module: {
            rules: [
                {
                    test: new RegExp(`.(${extensions.join('|')})$`),
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                useRelativePath,
                                name: '[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        }
    };
}
