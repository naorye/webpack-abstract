export function html() {
    return {
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html?-minimize'
                        }
                    ]
                }
            ]
        }
    };
}
