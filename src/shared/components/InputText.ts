import styled from 'styled-components/macro';
import { box } from 'styles/mixins/box/box.mixin';

export const InputText = styled.input.attrs({
  type: 'text',
})`
  ${box()}
`;
