import { UserDto } from 'api/dto/user.dto';
import React from 'react';
import Box from 'shared/components/Box';

type Props = {
  details?: UserDto;
};

const UserDetails = ({ details }: Props) => {
  return (
    <Box>
      <div>
        {details?.username} | {details?.email}
      </div>
      <div>
        {details?.firstName} {details?.lastName}
      </div>
    </Box>
  );
};

export default UserDetails;
