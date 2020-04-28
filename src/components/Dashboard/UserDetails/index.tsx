import { UserDto } from 'api/dto/user.dto';
import React from 'react';
import { Status } from 'util/status';
import * as Styled from './styled';
import Loader from 'shared/components/Loader';

type Props = {
  status: Status;
  details?: UserDto;
};

const UserDetails = ({ details, status }: Props) => {
  return (
    <Styled.UserDetailsContainer>
      {status === Status.Resolved ? (
        <>
          <Styled.Username>{details?.username}</Styled.Username>
          <Styled.Email>{details?.email}</Styled.Email>
          <div>
            {details?.firstName} {details?.lastName}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </Styled.UserDetailsContainer>
  );
};

export default UserDetails;
