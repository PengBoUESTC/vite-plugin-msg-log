import { ViteDevServer, PluginOption } from 'vite';
import colors from 'picocolors'

export interface PluginConfig {
  envKey?: string,
  strGetter?: () => string
}

export const logEnvPlugin = (configParams: PluginConfig = {}): PluginOption => {
  const { envKey = 'NODE_ENV', strGetter } = configParams

  const formateLogStr = `current runing env: ${strGetter ? strGetter() : process.env[envKey]}`

  return {
    enforce: 'post',
    name: 'vite:log-env',
    configureServer(server: ViteDevServer) {
      const { config } = server
      return () => {
        server.middlewares.use((req, res, next) => {
          next()
          config.logger.info(
            colors.green(formateLogStr),
            { clear: false, timestamp: true }
          )
        })
      }
    },
  }
}



