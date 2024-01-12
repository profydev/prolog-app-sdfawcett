import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonSize, ButtonColor, ButtonIcon } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({ size, color, icon, children }) => (
  <div style={{ padding: 10 }}>
    <Button
      color={color}
      size={size}
      icon={icon}
      onClick={() => alert("clicked")}
    >
      {children}
    </Button>
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  children: "Label",
};

export const Secondary = Template.bind({});
Secondary.args = {
  size: ButtonSize.sm,
  color: ButtonColor.secondary,
  children: "Label",
};

export const Gray = Template.bind({});
Gray.args = {
  size: ButtonSize.sm,
  color: ButtonColor.gray,
  children: "Label",
};

export const Empty = Template.bind({});
Empty.args = {
  size: ButtonSize.sm,
  color: ButtonColor.empty,
  children: "Label",
};

export const EmptyGray = Template.bind({});
EmptyGray.args = {
  size: ButtonSize.sm,
  color: ButtonColor.emptyGray,
  children: "Label",
};

export const Error = Template.bind({});
Error.args = {
  size: ButtonSize.sm,
  color: ButtonColor.error,
  children: "Label",
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  icon: ButtonIcon.only,
  children: (
    <>
      <img src="icons/circle.svg" alt="" />
    </>
  ),
};

export const IconLeading = Template.bind({});
IconLeading.args = {
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  icon: ButtonIcon.leading,
  children: (
    <>
      <p>Button CTA</p> <img src="icons/circle.svg" alt="" />
    </>
  ),
};

export const IconTrailing = Template.bind({});
IconTrailing.args = {
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  icon: ButtonIcon.trailing,
  children: (
    <>
      <p>Button CTA</p> <img src="icons/circle.svg" alt="" />
    </>
  ),
};
