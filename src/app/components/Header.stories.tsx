import type { Meta, StoryObj } from '@storybook/react';

import { within} from '@storybook/testing-library';

import { expect } from '@storybook/jest';

import Header from './Header';
const meta: Meta<typeof Header> = {
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByText("Chief Chronicler Finder")).toBeVisible()
}
}
