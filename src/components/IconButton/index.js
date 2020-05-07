// @flow

import React from 'react';
import styled from 'styled-components';

const Props = {
  onClick: Function,
};
const Button = styled.button`
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
`;
const Icon = styled.div`
  background-image: url(http://icons.iconarchive.com/icons/gakuseisean/ivista-2/256/Alarm-Plus-icon.png);
  background-size: cover;
  width: 20px;
  height: 20px;
`;
const IconButton = (props: Props) => {
  const { onClick, left, top } = props;
  return (
    <Button type="button" onClick={onClick} left={left} top={top}>
      <Icon />
    </Button>
  );
};
export default IconButton;
