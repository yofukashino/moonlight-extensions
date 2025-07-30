import { Patch, ExtensionWebpackModule } from "@moonlight-mod/types";

export const patches: Patch[] = [
  {
    find: 'updateAsync("audioContextSettings',
    replace: {
      match: /{volume:(\i)}/,
      replacement: (_, volume: string) => `{volume:${volume} > 199 ? 199 : ${volume}}`
    }
  },
  {
    find: "PreloadedUserSettings",
    replace: {
      match: /\i\.internalBinaryRead\(\i,\i\.uint32\(\),\i,\i\.audioContextSettings\)/,
      replacement: (audioContextSettings: string) =>
        `require('volumeManipulator_PreloadedUserSettings')._cleanseVolumes(${audioContextSettings})`
    }
  },
  {
    find: "user-volume",
    replace: {
      match: /return\(0,\w+\.jsx\)\(/,
      replacement: () => `return require('volumeManipulator_SliderEnhance')._enhanceSlider(`
    }
  }
];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  PreloadedUserSettings: {
    dependencies: [{ ext: "common", id: "stores" }],
    entrypoint: true
  },
  SliderEnhance: {
    dependencies: [
      {
        ext: "common",
        id: "ErrorBoundary"
      },
      { id: "react" },
      { id: "discord/uikit/TextInput" },
      { id: "classnames" }
    ],
    entrypoint: true
  },
  Settings: {
    entrypoint: true,
    dependencies: [
      { id: "react" },
      { ext: "spacepack", id: "spacepack" },
      { id: "discord/modules/markup/MarkupUtils" },
      { id: "discord/components/common/index" },
      { id: "discord/styles/shared/Margins.css" }
    ]
  }
};
