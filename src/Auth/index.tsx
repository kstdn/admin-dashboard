import React from 'react';
import styled from 'styled-components/macro';

const AuthFormContainer = styled.div`
  background: red;
  padding: 20px;
`;

export const Authentication = () => {
  return (
    <AuthFormContainer>
      Login
      <input type='text' />
      <input type='password' />
    </AuthFormContainer>
  );
};
