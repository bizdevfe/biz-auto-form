import React from 'react';
import {shallow} from 'enzyme';

import {Button} from '../../src/index';

describe('Button Spec', () => {
  const defaultWrapper = shallow(<Button>
    Default
  </Button>);
  describe('Default', () => {
    it('should generate a button tag', () => {
      expect(defaultWrapper).to.have.tagName('button')
    });

    it('should have type=button by default', () => {
      expect(defaultWrapper).to.have.prop('type', 'button')
    });
  });
});