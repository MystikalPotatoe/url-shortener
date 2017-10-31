import React from 'react';
import test from 'tape';
import { shallow,configure } from 'enzyme';
import miniapp from '../source/react/mini';
import BClass from '../source/react/bclass';
import ShallowRenderer from 'react-test-renderer/shallow';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const Miniapp = miniapp({ React });

const renderer = new ShallowRenderer();

renderer.render(<BClass />);

console.log(renderer.getRenderOutput());

// test('react unit test',(t) => {
//     const wrapper = shallow(<Miniapp />);
//     console.log(wrapper.render());
//     t.equal(wrapper.find('div').length,1,"didn't work!");
//     t.end();
// })