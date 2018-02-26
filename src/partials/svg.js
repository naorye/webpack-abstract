export function svg(options = {}) {
    return {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options
                        },
                        {
                            loader: 'svgo-loader',
                            options: {
                                plugins: [
                                    { cleanupAttrs: true },
                                    { removeComments: true },
                                    { removeMetadata: true },
                                    { removeTitle: true },
                                    { removeDesc: true },
                                    { removeUselessDefs: true },
                                    { removeEditorsNSData: true },
                                    { removeEmptyAttrs: true },
                                    { removeHiddenElems: true },
                                    { removeEmptyText: true },
                                    { removeEmptyContainers: true },
                                    { minifyStyles: true },
                                    { convertStyleToAttrs: true },
                                    { convertColors: true },
                                    { convertPathData: true },
                                    { convertTransform: true },
                                    { removeUnknownsAndDefaults: true },
                                    { removeNonInheritableGroupAttrs: true },
                                    { removeUselessStrokeAndFill: true },
                                    { removeUnusedNS: true },
                                    { cleanupIDs: true },
                                    { cleanupNumericValues: true },
                                    { cleanupListOfValues: true },
                                    { moveElemsAttrsToGroup: true },
                                    { mergePaths: true },
                                    { convertShapeToPath: true },
                                    { removeDimensions: true },
                                    //enabling these screws IE/Edge
                                    { moveGroupAttrsToElems: false },
                                    { collapseGroups: false }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    };
}
