import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Input } from "./Input";

export default {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = ({
  error,
  label,
  hint,
  icon,
  errorText,
  ariaText,
  placeholder,
  defaultValue,
  disabled,
}) => (
  <div style={{ padding: 50, width: "5rem" }}>
    <Input
      error={error}
      label={label}
      hint={hint}
      icon={icon}
      errorText={errorText}
      ariaText={ariaText}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
    />
  </div>
);

export const Empty = Template.bind({});
Empty.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "empty text input",
};

export const Filled = Template.bind({});
Filled.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "filled text input",
  defaultValue: "olivia@untitledui.com",
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "disabled text input",
  disabled: true,
};

export const MailIconEmpty = Template.bind({});
MailIconEmpty.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "empty text input with mail icon",
  icon: "/icons/mail.svg",
};

export const MailIconFilled = Template.bind({});
MailIconFilled.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "filled text input with mail icon",
  defaultValue: "olivia@untitledui.com",
  icon: "/icons/mail.svg",
};

export const MailIconDisabled = Template.bind({});
MailIconDisabled.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "disabled text input with mail icon",
  disabled: true,
  icon: "/icons/mail.svg",
};

export const LabelEmpty = Template.bind({});
LabelEmpty.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "empty text input with label",
  label: "Email",
};

export const LabelEmptyIcon = Template.bind({});
LabelEmptyIcon.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "empty text input with label and icon",
  label: "Email",
  icon: "/icons/mail.svg",
};

export const HintEmptyIcon = Template.bind({});
HintEmptyIcon.args = {
  placeholder: "olivia@untitled.com",
  ariaText: "empty text input with hint and icon",
  hint: "This is a hint to help the user",
  icon: "/icons/mail.svg",
};

export const ErrorEmptyIcon = Template.bind({});
ErrorEmptyIcon.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "empty text input with error and icon",
  error: true,
};

export const ErrorFilledIcon = Template.bind({});
ErrorFilledIcon.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "filled text input with error and icon",
  error: true,
  defaultValue: "olivia@untitled.com",
};

export const ErrorEmptyDisabled = Template.bind({});
ErrorEmptyDisabled.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "empty text input with error, icon, and text",
  error: true,
  disabled: true,
};

export const ErrorEmptyIconText = Template.bind({
  placeholder: "olivia@untitledui.com",
  ariaText: "empty text input with error, icon, and text",
  error: true,
  icon: "/icons/mail.svg",
});

export const ErrorFilledIconText = Template.bind({});
ErrorFilledIconText.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "filled text input with error, icon, and text",
  error: true,
  defaultValue: "olivia@untitledui.com",
  icon: "/icons/mail.svg",
};

export const ErrorIconDisabled = Template.bind({});
ErrorIconDisabled.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "disabled text input with error and icon",
  error: true,
  disabled: true,
  icon: "/icons/mail.svg",
};

export const ErrorEmptyMessage = Template.bind({});
ErrorEmptyMessage.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "empty text input with error and message",
  error: true,
  errorText: "This is an error message",
};

export const ErrorFilledMessage = Template.bind({});
ErrorFilledMessage.args = {
  placeholder: "olivia@untitledui.com",
  ariaText: "filled text input with error and message",
  error: true,
  defaultValue: "olivia@untitledui.com",
  errorText: "This is an error message",
};

export const ErrorDisabledMessage = Template.bind({
  placeholder: "olivia@untitledui.com",
  ariaText: "disabled text input with error and message",
  error: true,
  disabled: true,
  errorText: "This is an error message",
});
