import { RoleDto } from 'api/modules/authorization/dto/role.dto';
import React from 'react';
import SelectEntity from 'shared/components/SelectEntity/SelectEntity';
import { selectors, slice } from 'store/slices/Roles';

type Props = {
  onChange: (role: RoleDto) => void;
};

const SelectRole = ({ onChange }: Props) => {
  return (
    <SelectEntity<RoleDto>
      selectors={selectors}
      loadActionCreator={slice.actions.load}
      getDisplayValueFunc={value => value.name}
      onChange={onChange}
    />
  );
};

export default SelectRole;
