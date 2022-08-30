"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEnvPlugin = void 0;
const picocolors_1 = require("picocolors");
const logEnvPlugin = (configParams = {}) => {
    const { envKey = 'NODE_ENV', strGetter } = configParams;
    const formateLogStr = () => strGetter ? strGetter() : `current runing env: ${process.env[envKey]}`;
    const logger = (server) => {
        const { config } = server;
        config.logger.info((0, picocolors_1.green)(formateLogStr()), { clear: false, timestamp: true });
    };
    return {
        enforce: 'post',
        name: 'vite:log-env',
        configureServer(server) {
            return () => {
                server.middlewares.use((req, res, next) => {
                    next();
                    logger(server);
                });
            };
        },
        handleHotUpdate({ server }) {
            logger(server);
        }
    };
};
exports.logEnvPlugin = logEnvPlugin;
