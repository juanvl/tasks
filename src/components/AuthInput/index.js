import React from 'react';

import { Container, IconContainer, Input } from './styles';

const AuthInput = props => (
  <Container>
    <IconContainer name={props.icon} size={20} />
    <Input {...props}></Input>
  </Container>
);

export default AuthInput;
