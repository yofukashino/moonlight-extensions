import React from "@moonlight-mod/wp/react";
import TextInput from "@moonlight-mod/wp/discord/uikit/TextInput";
import ErrorBoundary from "@moonlight-mod/wp/common_ErrorBoundary";
import classNames from "@moonlight-mod/wp/classnames";
import { Text } from "@moonlight-mod/wp/discord/components/common/index";

interface SliderProps {
  disabled?: boolean;
  isFocused: boolean;
  maxValue: number;
  minValue?: number;
  onChange: (volume: number) => void;
  onClose: (...args: unknown[]) => void;
  onInteraction?: (...args: unknown[]) => void;
  value: number;
}

type SliderType = React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLDivElement>>;

interface SliderTextInputWrapperProps {
  slider: React.ReactElement;
  updateSlider: (value: number) => void;
  minValue?: number;
  maxValue: number;
  value: number;
  onChange: (volume: number) => void;
}

function SliderTextInputWrapper({
  slider,
  minValue,
  maxValue,
  value: v,
  onChange,
  updateSlider
}: SliderTextInputWrapperProps) {
  const [value, setValue] = React.useState(v?.toFixed?.(0).toString());
  const [errorState, setErrorState] = React.useState(false);
  const [shouldUpdateSlider, setShouldUpdateSlider] = React.useState(true);
  React.useEffect(() => {
    const valueNum = Number(value);
    if (valueNum > maxValue || (valueNum === 0 && value !== "0")) {
      setErrorState(true);
      return;
    }
    onChange(valueNum);
    if (shouldUpdateSlider) updateSlider(valueNum);
    if (errorState) setErrorState(false);
  }, [value]);

  React.useEffect(() => {
    setShouldUpdateSlider(false);
    setValue(() => v?.toFixed?.(0).toString());
  }, [v]);
  return (
    <div>
      {slider}
      <div
        className={classNames("volumeManipulator", {
          "volumeManipulator-errorState": errorState
        })}
      >
        <TextInput
          type="number"
          id="volume"
          min={minValue}
          max={maxValue}
          value={value}
          onKeyDown={(event) => event.stopPropagation()}
          onChange={(value: string) => {
            if (!shouldUpdateSlider) setShouldUpdateSlider(true);
            setValue(value);
          }}
          className={"volumeManipulator-input"}
        />
        <Text variant="eyebrow" className="volumeManipulator-suffix">
          %
        </Text>
      </div>
    </div>
  );
}

export function _enhanceSlider(Silder: SliderType, props: SliderProps) {
  const { value, onChange, minValue } = props;
  const maxValue = (moonlight.getConfigOption<number>("volumeManipulator", "multiplier") ?? 2.5) * 200;
  const [key, setKey] = React.useState(value);
  return (
    <ErrorBoundary>
      <SliderTextInputWrapper
        value={value}
        onChange={onChange}
        minValue={minValue}
        maxValue={maxValue}
        updateSlider={setKey}
        slider={<Silder key={key} {...props} maxValue={maxValue} />}
      />
    </ErrorBoundary>
  );
}
