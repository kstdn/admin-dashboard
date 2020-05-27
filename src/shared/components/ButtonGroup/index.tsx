import styled from 'styled-components/macro';
import { Button } from '../Button';
import { Flex } from '../Flex';

const ButtonGroup = styled(Flex)`
  ${Button} {
    flex-grow: 1;
  }

  ${Button}:first-of-type {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  ${Button}:not(:first-of-type):not(:last-of-type) {
    border-radius: 0;
  }

  ${Button}:last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export default ButtonGroup;
