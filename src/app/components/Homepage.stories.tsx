import type { Meta, StoryObj } from '@storybook/react';

import { within,userEvent } from '@storybook/testing-library';

import { expect } from '@storybook/jest';

import { HomePage } from './HomePage';

const meta: Meta<typeof HomePage> = {
  component: HomePage,
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByText("This tool will help to find the chief chronicle. Just upload the coordinates file or manually input the lists, and it will calculate the distance between them.")).toBeVisible()
    const firstInput = canvas.getByPlaceholderText('Enter first list (e.g. 1 2 3)');
    const secondInput = canvas.getByPlaceholderText('Enter second list (e.g. 4 5 6)');
    await userEvent.type(firstInput, '1 2 3');
    await userEvent.type(secondInput, '4 5 6');
    expect(firstInput).toHaveValue('1 2 3');
    expect(secondInput).toHaveValue('4 5 6');
    const submitButton = canvas.getByRole('button', { name: /Calculate Distance/i })
    await userEvent.click(submitButton);
    const totalDistance = await canvas.queryByText(/Total Distance/i);
    expect(totalDistance).toBeInTheDocument();
}

}

export const CheckFileUpload: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fileInput = canvas.getByLabelText(/Upload File/i);
  const mockFile = new File(['1 4\n2 5\n3 6'], 'coordinates.txt', {
    type: 'text/plain',
  });
  await userEvent.upload(fileInput, mockFile);
  expect(canvas.getByText('coordinates.txt')).toBeInTheDocument();
  const deleteButton = canvas.getByText(/Delete/i);
  await userEvent.click(deleteButton);
  expect(canvas.queryByText('coordinates.txt')).not.toBeInTheDocument();
}
}