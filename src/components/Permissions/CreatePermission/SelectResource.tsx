import { ResourceDto } from 'api/modules/authorization/dto/resource.dto';
import React from 'react';
import SelectEntity from 'shared/components/SelectEntity/SelectEntity';
import { selectors, slice } from 'store/slices/Resources';

type Props = {
  onChange: (resource: ResourceDto) => void;
};

const SelectResource = ({ onChange }: Props) => (
  <SelectEntity<ResourceDto>
    selectors={selectors}
    loadActionCreator={slice.actions.load}
    getDisplayValueFunc={value => value.name}
    onChange={onChange}
  />
);

export default SelectResource;
