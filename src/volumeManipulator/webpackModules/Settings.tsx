import React from "@moonlight-mod/wp/react";
import Moonbase from "@moonlight-mod/wp/moonbase_moonbase";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import MarkupUtils from "@moonlight-mod/wp/discord/modules/markup/MarkupUtils";
import { FormItem, FormText, Slider } from "@moonlight-mod/wp/discord/components/common/index";
import type { CustomComponentProps } from "@moonlight-mod/types/coreExtensions/moonbase";

const Margins = spacepack.require("discord/styles/shared/Margins.css");

function MultiplierSettings({ value, setValue }: CustomComponentProps): React.ReactNode {
  return (
    <FormItem className={Margins.marginTop20} title="Max Volume Multiplier">
      <FormText key={value}>
        {MarkupUtils.parse(`The max threshold for volume. (Default: 200, Current: ${200 * (value ?? 2.5)})`, true, {
          hideSimpleEmbedContent: true,
          allowLinks: true
        })}
      </FormText>
      <Slider
        initialValue={value ?? 2.5}
        minValue={0.5}
        maxValue={5}
        // @ts-expect-error this is working?
        markers={[0.5, 1, 2, 2.5, 3, 4, 5]}
        stickToMarkers={true}
        onValueChange={setValue}
      />
    </FormItem>
  );
}

Moonbase.registerConfigComponent("volumeManipulator", "multiplier", MultiplierSettings);
