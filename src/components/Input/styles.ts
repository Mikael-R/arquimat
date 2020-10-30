/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const InputBlock = styled.div`
  &:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: ${({ theme }) => theme.focusLineColor};
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }
`;
