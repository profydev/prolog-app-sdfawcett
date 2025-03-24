import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Select } from "./Select";

export default {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = ({
  options,
  groupName,
  ariaText,
  placeholder,
  icon,
  disabled,
  label,
  hintText,
  error,
  errorText,
  value,
}) => (
  <div style={{ padding: 50, width: "320px" }}>
    <Select
      options={options}
      groupName={groupName}
      ariaText={ariaText}
      action={() => {
        console.log("Action function called");
      }}
      placeholder={placeholder}
      icon={icon}
      disabled={disabled}
      label={label}
      hintText={hintText}
      error={error}
      errorText={errorText}
      value={value}
    />
  </div>
);

const options = [
  { name: "Phoenix Baker", value: "Phoenix Baker" },
  { name: "Olivia Rhye", value: "Olivia Rhye" },
  { name: "Lana Steiner", value: "Lana Steiner" },
  { name: "Demi Wilkinson", value: "Demi Wilkinson" },
  { name: "Candice Wu", value: "Candice Wu" },
  { name: "Natali Wong", value: "Natali Wong" },
  { name: "Drew Cano", value: "Drew Cano" },
];

const optionsWithIcon = [
  { name: "Phoenix Baker", value: "Phoenix Baker", img: "/icons/user.svg" },
  { name: "Olivia Rhye", value: "Olivia Rhye", img: "/icons/user.svg" },
  { name: "Lana Steiner", value: "Lana Steiner", img: "/icons/user.svg" },
  { name: "Demi Wilkinson", value: "Demi Wilkinson", img: "/icons/user.svg" },
  { name: "Candice Wu", value: "Candice Wu", img: "/icons/user.svg" },
  { name: "Natali Wong", value: "Natali Wong", img: "/icons/user.svg" },
  { name: "Drew Cano", value: "Drew Cano", img: "/icons/user.svg" },
];

export const Empty = Template.bind({});
Empty.args = {
  options,
  groupName: "empty",
  ariaText: "Empty",
  placeholder: "Select team member",
};

export const EmptyItemWithIcon = Template.bind({});
EmptyItemWithIcon.args = {
  options: optionsWithIcon,
  groupName: "empty",
  ariaText: "Empty",
  placeholder: "Select team member",
};

export const WithDefault = Template.bind({});
WithDefault.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select team member",
  value: "Olivia Rhye",
};

export const Disabled = Template.bind({});
Disabled.args = {
  options,
  groupName: "disabled",
  ariaText: "Disabled",
  placeholder: "Select team member",
  disabled: true,
};

export const EmptyWithIcon = Template.bind({});
EmptyWithIcon.args = {
  options,
  groupName: "empty",
  ariaText: "Empty",
  placeholder: "Select team member",
  icon: "/icons/user.svg",
};

export const EmptyWithIconItemsWithIcon = Template.bind({});
EmptyWithIconItemsWithIcon.args = {
  options: optionsWithIcon,
  groupName: "empty",
  ariaText: "Empty",
  placeholder: "Select team member",
  icon: "/icons/user.svg",
};

export const WithDefaultIcon = Template.bind({});
WithDefaultIcon.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select team member",
  icon: "/icons/user.svg",
  value: "Olivia Rhye",
};

export const WithIconDisabled = Template.bind({});
WithIconDisabled.args = {
  options,
  groupName: "disabled",
  ariaText: "Disabled",
  placeholder: "Select team member",
  disabled: true,
  icon: "/icons/user.svg",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select team member",
  label: "Team member",
};

export const WithLabelSelected = Template.bind({});
WithLabelSelected.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select team member",
  label: "Team member",
  icon: "/icons/user.svg",
  value: "Olivia Rhye",
};

export const WithLabelDisabled = Template.bind({});
WithLabelDisabled.args = {
  options,
  groupName: "disabled",
  ariaText: "Disabled",
  placeholder: "Select team member",
  disabled: true,
  label: "Team member",
};

export const WithHintText = Template.bind({});
WithHintText.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select team member",
  hintText: "This is a hint text to help user.",
};

export const WithHintTextSelected = Template.bind({});
WithHintTextSelected.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select team member",
  hintText: "This is a hint text to help user.",
  value: "Olivia Rhye",
};

export const WithErrorEmpty = Template.bind({});
WithErrorEmpty.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select team member",
  error: true,
};

export const WithErrorSelected = Template.bind({});
WithErrorSelected.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select team member",
  error: true,
  value: "Olivia Rhye",
};

export const WithErrorDisabled = Template.bind({});
WithErrorDisabled.args = {
  options,
  groupName: "disabled",
  ariaText: "Disabled",
  placeholder: "Select team member",
  disabled: true,
  error: true,
};

export const WithErrorEmptyIcon = Template.bind({});
WithErrorEmptyIcon.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select team member",
  error: true,
  icon: "/icons/user.svg",
};

export const WithErrorSelectedIcon = Template.bind({});
WithErrorSelectedIcon.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select team member",
  error: true,
  icon: "/icons/user.svg",
  value: "Olivia Rhye",
};

export const WithErrorDisabledIcon = Template.bind({});
WithErrorDisabledIcon.args = {
  options,
  groupName: "disabled",
  ariaText: "Disabled",
  placeholder: "Select team member",
  disabled: true,
  error: true,
  icon: "/icons/user.svg",
};

export const WithErrorEmptyMessage = Template.bind({});
WithErrorEmptyMessage.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select team member",
  error: true,
  errorText: "This is a error message.",
};

export const WithErrorSelectedMessage = Template.bind({});
WithErrorSelectedMessage.args = {
  options,
  groupName: "default",
  ariaText: "Default",
  placeholder: "Select team member",
  error: true,
  errorText: "This is a error message.",
  value: "Olivia Rhye",
};

export const WithErrorDisabledMessage = Template.bind({});
WithErrorDisabledMessage.args = {
  options,
  groupName: "disabled",
  ariaText: "Disabled",
  placeholder: "Select team member",
  disabled: true,
  error: true,
  errorText: "This is a error message.",
};
