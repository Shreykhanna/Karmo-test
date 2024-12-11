import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  framework: '@storybook/nextjs', 
  stories: [
    '../src/**/*.mdx', 
    '../src/**/*.stories.@(js|jsx|ts|tsx)' 
  ],
  addons: [
    '@storybook/addon-interactions',  
    '@storybook/addon-essentials',  
  ],
};

export default config;
