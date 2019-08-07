import React from 'react';
import { shallow } from 'enzyme';
import CardBox from '../CardBox';

describe('CardBox', () => {
  it('sets correct heading text when headerOutside is true', () => {
    const cardbox = shallow(<CardBox
	  heading={'header text'}
	  styleName={null}
	  cardStyle={null}
	  childrenStyle={null}
	  headerOutside={true}
	/>);
	expect(cardbox.text()).toEqual('header text');
    expect(cardbox).toMatchSnapshot();
  });
});
