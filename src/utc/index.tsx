import { ExtensionWebExports, ExtensionWebpackModule } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
  {
    find: ".jsx=",
    replace: {
      match: /return{\$\$typeof:\i,type:(\i).+?props:(\i)/,
      replacement: (suffix, type, props) => `require("utc_classname").patchClassName(${props}, ${type});${suffix}`
    }
  }
];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  classname: {
    entrypoint: true
  }
};
