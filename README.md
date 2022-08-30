# vite-plugin-msg-log
log your current env

## example

1. U can provide some config to `logEnvPlugin`,

  - `envKey`: the key of env which mount on the `process.env` object

  - `strGetter`: a function to gen a str 

```javascript
import { logEnvPlugin } from 'vite-plugin-msg-log';

export default defineConfig({
  // ...
  plugins: [
    // logEnvPlugin({
    //   envKey: 'ENV'
    // }),
    logEnvPlugin({
      strGetter: () => {
        return 'show msg after web request!'
      }
    }),
  ]
  // ...
})
```