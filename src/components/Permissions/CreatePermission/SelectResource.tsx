import { ResourceDto } from 'api/modules/authorization/dto/resource.dto';
import React from 'react';
import { selectors } from 'store/slices/Resources';
import SelectEntity from 'shared/components/SelectEntity/SelectEntity';

type Props = {
  onChange: (resource: ResourceDto) => void;
};

const SelectResource = ({ onChange }: Props) => (
  <SelectEntity<ResourceDto>
    selectors={selectors}
    getDisplayValueFunc={value => value.name}
    onChange={onChange}
  />
);

export default SelectResource;
