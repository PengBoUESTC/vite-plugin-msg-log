import { ViteDevServer, PluginOption } from 'vite';
import { green } from 'picocolors';

export interface PluginConfig {
  envKey?: string;
  strGetter?: () => string;
}

export const logEnvPlugin = (configParams: PluginConfig = {}): PluginOption => {
  const { envKey = 'NODE_ENV', strGetter } = configParams;

  const formateLogStr = () =>
    strGetter ? strGetter() : `current runing env: ${process.env[envKey]}`;
  const logger = (server: ViteDevServer) => {
    const { config } = server;

    config.logger.info(green(formateLogStr()), {
      clear: false,
      timestamp: true,
    });
  };
  return {
    enforce: 'post',
    name: 'vite:log-env',
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use((req, res, next) => {
          next();
          logger(server);
        });
      };
    },
    handleHotUpdate({ server }) {
      logger(server);
    },
  };
};
