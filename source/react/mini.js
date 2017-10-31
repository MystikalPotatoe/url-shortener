'use strict';
import React from 'react';
import Content from './main-container';
import Heading from './heading';
import Intro from './introduction';
import Instructions from './instructions';

const outputFactory = function () {
  
  return (
    <Content>
      <Heading />
      <Intro />
      <Instructions />
    </Content>
  );
};

export default outputFactory;