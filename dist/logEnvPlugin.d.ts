import { PluginOption } from 'vite';
export interface PluginConfig {
    envKey?: string;
    strGetter?: () => string;
}
export declare const logEnvPlugin: (configParams?: PluginConfig) => PluginOption;
