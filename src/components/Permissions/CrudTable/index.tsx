import { ResourceActionsDto } from 'api/modules/authorization/dto/resource-permission.dto';
import React from 'react';
import Checkbox from './Checkbox';
import * as Styled from './styled';

type Props = {
  actions: ResourceActionsDto;
  onChange: (permissionChange: Partial<ResourceActionsDto>) => void;
};

const CrudTable = ({ actions, onChange }: Props) => {
  return (
    <Styled.Table>
      <div></div>
      <div>Create</div>
      <div>Read</div>
      <div>Update</div>
      <div>Delete</div>
      <div>Own</div>
      <Checkbox
        checked={actions.createOwn}
        onChange={checked => onChange({ createOwn: checked })}
      />
      <Checkbox
        checked={actions.readOwn}
        onChange={checked => onChange({ readOwn: checked })}
      />
      <Checkbox
        checked={actions.updateOwn}
        onChange={checked => onChange({ updateOwn: checked })}
      />
      <Checkbox
        checked={actions.deleteOwn}
        onChange={checked => onChange({ deleteOwn: checked })}
      />
      <div>Any</div>
      <Checkbox
        checked={actions.createAny}
        onChange={checked => onChange({ createAny: checked })}
      />
      <Checkbox
        checked={actions.readAny}
        onChange={checked => onChange({ readAny: checked })}
      />
      <Checkbox
        checked={actions.updateAny}
        onChange={checked => onChange({ updateAny: checked })}
      />
      <Checkbox
        checked={actions.deleteAny}
        onChange={checked => onChange({ deleteAny: checked })}
      />
    </Styled.Table>
  );
};

export default CrudTable;
