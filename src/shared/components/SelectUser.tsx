import { UserDto } from 'api/modules/users/dto/user.dto';
import React from 'react';
import SelectEntity from 'shared/components/SelectEntity/SelectEntity';
import { selectors, slice } from 'store/slices/Users';

type Props = {
  onChange: (user: UserDto) => void;
};

const SelectUser = ({ onChange }: Props) => {
  return (
    <SelectEntity<UserDto>
      selectors={selectors}
      loadActionCreator={slice.actions.load}
      getDisplayValueFunc={value => value.username}
      onChange={onChange}
    />
  );
};

export default SelectUser;
