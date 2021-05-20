import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: 12rem;
  height: 3rem;
  color: #260801;
  padding: 0rem 1rem;
  position: relative;
  background: #e7d1be;
  align-items: center;
  border-radius: 0.4rem;
  justify-content: center;

  div {
    width: 94%;
    position: absolute;
    bottom: 0;
  }

  ${props =>
    props.isFocused &&
    css`
      div {
        border-bottom: 2px solid #260801;
      }
    `}

  input {
    border: 0;
    width: 100%;
    font-size: 1.2rem;
    background: #e7d1be;
  }
`;
