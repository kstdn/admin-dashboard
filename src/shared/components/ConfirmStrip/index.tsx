import React, { cloneElement, ReactNode, useState } from 'react';
import styled from 'styled-components/macro';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { Flex } from '../Flex/styled';

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const SecondScreen = styled(Flex).attrs({gap: true})`
  align-items: center;
`;

type Props = {
  trigger: JSX.Element;
  children: ReactNode;
  onConfirm?: Function;
  onReject?: Function;
};

const ConfirmStrip = ({
  trigger,
  children,
  onConfirm = () => {},
  onReject = () => {},
}: Props) => {
  const [secondScreenVisible, setSecondScreenVisible] = useState(false);

  const handleTriggerClick = () => setSecondScreenVisible(true);
  const handleConfirm = () => {
    setSecondScreenVisible(false);
    onConfirm();
  };

  const handleReject = () => {
    setSecondScreenVisible(false);
    onReject();
  };

  return (
    <Container>
      {!secondScreenVisible && (
        <Flex gap={true}>
          {cloneElement(trigger, {
            onClick: handleTriggerClick,
          })}
          <Divider />
          {children}
        </Flex>
      )}
      {secondScreenVisible && (
        <SecondScreen>
          {'Are you sure?'}
          <Divider />
          <Button color='success' onClick={handleConfirm}>
            Yes
          </Button>
          <Button color='danger' onClick={handleReject}>
            No
          </Button>
        </SecondScreen>
      )}
    </Container>
  );
};

export default ConfirmStrip;
