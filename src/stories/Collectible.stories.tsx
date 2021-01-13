import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Collectible, { CollectibleParams } from '../components/Collectible';

export default {
    title: 'Example/Collectible',
    component: Collectible
} as Meta;

const Template: Story<CollectibleParams> = (args) => <Collectible
    {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    name: "Collectible 1",
    count: 10,
    collection: "collection 1"
};
