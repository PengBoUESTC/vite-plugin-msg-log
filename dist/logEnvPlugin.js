"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEnvPlugin = void 0;
const picocolors_1 = require("picocolors");
const logEnvPlugin = (configParams = {}) => {
    const { envKey = 'NODE_ENV', strGetter } = configParams;
    const formateLogStr = `current runing env: ${strGetter ? strGetter() : process.env[envKey]}`;
    return {
        enforce: 'post',
        name: 'vite:log-env',
        configureServer(server) {
            const { config } = server;
            return () => {
                server.middlewares.use((req, res, next) => {
                    next();
                    config.logger.info(picocolors_1.default.green(formateLogStr), { clear: false, timestamp: true });
                });
            };
        },
    };
};
exports.logEnvPlugin = logEnvPlugin;
