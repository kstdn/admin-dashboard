import React, { cloneElement, ReactNode, useState, ComponentProps } from 'react';
import { Check, X } from 'react-feather';
import styled from 'styled-components/macro';
import { Divider } from '../Divider';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';

const SecondScreen = styled(Flex).attrs({ gap: true })`
  align-items: center;
`;

type Props = {
  trigger: JSX.Element;
  beforeTrigger?: ReactNode;
  afterTrigger?: ReactNode;
  onConfirm?: Function;
  onReject?: Function;
  confirmButtonProps?: Partial<ComponentProps<typeof IconButton>>;
  rejectButtonProps?: Partial<ComponentProps<typeof IconButton>>;
};

const ConfirmStrip = ({
  trigger,
  beforeTrigger,
  afterTrigger,
  onConfirm = () => {},
  onReject = () => {},
  confirmButtonProps,
  rejectButtonProps,
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
    <>
      {!secondScreenVisible && (
        <Flex gap={true}>
          {beforeTrigger}
          {cloneElement(trigger, {
            onClick: handleTriggerClick,
          })}
          {afterTrigger}
        </Flex>
      )}
      {secondScreenVisible && (
        <SecondScreen>
          <span>{'Are you sure?'}</span>
          <Divider />
          <IconButton
            icon={<Check />}
            color='success'
            onClick={handleConfirm}
            {...confirmButtonProps}
          />
          <IconButton
            icon={<X />}
            color='danger'
            onClick={handleReject}
            {...rejectButtonProps}
          />
        </SecondScreen>
      )}
    </>
  );
};

export default ConfirmStrip;
