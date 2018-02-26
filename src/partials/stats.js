import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import StatsPlugin from 'stats-webpack-plugin';
import Visualizer from 'webpack-visualizer-plugin';

export function stats() {
    return {
        plugins: [
            new Visualizer(),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: 'bundle-analysis.html',
                openAnalyzer: false
            }),
            new StatsPlugin('stats.json', {
                hash: true,
                assets: true,
                reasons: true,
                chunks: true,
                source: false
            })
        ]
    };
}
