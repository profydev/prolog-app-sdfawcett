import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Checkbox, CheckboxType, CheckboxSize } from "./checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = ({
  size,
  label,
  checkboxType,
  disabled,
  checked,
}) => (
  <div style={{ padding: 50 }}>
    <Checkbox
      size={size}
      label={label}
      checkboxType={checkboxType}
      disabled={disabled}
      checked={checked}
    />
  </div>
);

export const Small = Template.bind({});
Small.args = {
  size: CheckboxSize.sm,
  label: "Label",
  checkboxType: CheckboxType.check,
};

export const Medium = Template.bind({});
Medium.args = {
  size: CheckboxSize.md,
  label: "Label",
  checkboxType: CheckboxType.check,
};

export const SmallChecked = Template.bind({});
SmallChecked.args = {
  size: CheckboxSize.sm,
  label: "Label",
  checkboxType: CheckboxType.check,
  checked: true,
};

export const MediumChecked = Template.bind({});
MediumChecked.args = {
  size: CheckboxSize.md,
  label: "Label",
  checkboxType: CheckboxType.check,
  checked: true,
};

export const SmallPartly = Template.bind({});
SmallPartly.args = {
  size: CheckboxSize.sm,
  label: "Label",
  checkboxType: CheckboxType.partly,
  checked: true,
};

export const MediumPartly = Template.bind({});
MediumPartly.args = {
  size: CheckboxSize.md,
  label: "Label",
  checkboxType: CheckboxType.partly,
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  size: CheckboxSize.md,
  label: "Label",
  checkboxType: CheckboxType.check,
  disabled: true,
};

export const DisabledCheck = Template.bind({});
DisabledCheck.args = {
  size: CheckboxSize.md,
  label: "Label",
  checkboxType: CheckboxType.check,
  checked: true,
  disabled: true,
};

export const DisabledPartly = Template.bind({});
DisabledPartly.args = {
  size: CheckboxSize.md,
  label: "Label",
  checkboxType: CheckboxType.partly,
  checked: true,
  disabled: true,
};

export const NoText = Template.bind({});
NoText.args = {
  size: CheckboxSize.md,
  checkboxType: CheckboxType.check,
};
