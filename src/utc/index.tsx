import { ExtensionWebExports, ExtensionWebpackModule } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
  {
    find: ".jsx=",
    replace: {
      match: /return{\$\$typeof:\i,type:(\i).+?props:(\i)/,
      replacement: (suffix, type, props) =>
        ` ${props}.className && ${type} !== 'html' && (${props}.className = require("utc_classname").getClassName(${props}.className));${suffix}`
    }
  }
];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  classname: {
    entrypoint: true
  }
};
