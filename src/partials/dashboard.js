import DashboardPlugin from 'webpack-dashboard/plugin';

export function dashboard(options) {
    return {
        plugins: [
            new DashboardPlugin(options)
        ]
    };
}
