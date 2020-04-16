import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'store/actions';
import styled from 'styled-components/macro';

const AuthFormContainer = styled.div`
  background: red;
  padding: 20px;
`;

export const Authentication = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(login());
  };

  return (
    <>
      <AuthFormContainer>
        Login
        <input type='text' />
        <input type='password' />
      </AuthFormContainer>
      <button onClick={handleClick}>LOG ME</button>
    </>
  );
};