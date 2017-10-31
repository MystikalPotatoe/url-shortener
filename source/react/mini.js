'use strict';
import React from 'react';
import Content from './main-container';
import Heading from './heading';
import Intro from './introduction';

const outputFactory = function () {
  
  return (
    <Content>
      <Heading />
      <Intro />
    </Content>
  );
};

export default outputFactory;