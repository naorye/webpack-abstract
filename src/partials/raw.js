export function raw() {
    return {
        module: {
            rules: [
                {
                    test: /\.raw$/,
                    use: [
                        'raw-loader'
                    ]
                }
            ]
        }
    };
}
