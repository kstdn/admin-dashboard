import React from 'react';
import { useSelector } from 'react-redux';
import { getStatus } from 'store/selectors/auth';
import { Status } from 'util/status';
import { LoginForm } from './LoginForm';
import * as Styled from './styled';

export const Authentication = () => {
  const status = useSelector(getStatus);
  const showLoginForm = status !== Status.Loading;

  return (
    <Styled.AuthenticationContainer>
      {showLoginForm ? <LoginForm /> : <div>Loading...</div>}
    </Styled.AuthenticationContainer>
  );
};
