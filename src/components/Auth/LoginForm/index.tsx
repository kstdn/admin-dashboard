import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'store/actions';
import * as Styled from './styled';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      login({
        username,
        password,
      }),
    );
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.FormLabel>Login</Styled.FormLabel>
      <Styled.Label htmlFor='username'>Username</Styled.Label>
      <Styled.Input
        type='text'
        name='username'
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <Styled.Label htmlFor='password'>Password</Styled.Label>
      <Styled.Input
        type='password'
        name='password'
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <Styled.SubmitButton type='submit'>Submit</Styled.SubmitButton>
    </Styled.Form>
  );
};
