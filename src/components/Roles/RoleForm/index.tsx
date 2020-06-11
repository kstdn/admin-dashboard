import { createRole, updateRole } from 'api';
import { RoleDto } from 'api/modules/authorization/dto/role.dto';
import { GENERIC_ERROR } from 'messages';
import React, { FormEvent, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import PanelContainer from 'shared/components/Container/PanelContainer';
import { Divider } from 'shared/components/Divider';
import { Flex } from 'shared/components/Flex';
import { InputText } from 'shared/components/InputText';
import { Label } from 'shared/components/Label';
import Loader from 'shared/components/Loader';
import { Stack } from 'shared/components/Stack';
import { Route } from 'shared/UrlRoute';
import { Mode } from 'util/mode';
import { Status } from 'util/status';
import RoleUsers from './RoleUsers';
import * as Styled from './styled';

const RoleForm = () => {
  const { state: roleFromLocationState } = useLocation<RoleDto>();

  const [role, setRole] = useState<RoleDto>(roleFromLocationState);
  const [name, setName] = useState<string>(role?.name ?? '');

  const [status, setStatus] = useState(Status.Idle);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const mode: Mode = role ? Mode.Editing : Mode.Creating;
  const isCreating = mode === Mode.Creating;
  const nameFormValid = !!name && (isCreating ? true : role.name !== name); 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setStatus(Status.Loading);
      const updatedRole = await (isCreating
        ? createRole(name)
        : updateRole(role.id, name));
      setStatus(Status.Resolved);
      setRole(updatedRole);
    } catch {
      setStatus(Status.Rejected);
      setError(GENERIC_ERROR);
    }
  };

  if (status === Status.Loading) return <Loader />;

  return (
    <PanelContainer>
      <Styled.Card
        header={isCreating ? 'CREATING ROLE' : `UPDATING ROLE: ${role.name}`}
        content={
          <Stack gap={true}>
            <form id='role-form' onSubmit={handleSubmit}>
              <Stack gap={true}>
                <Label>Name</Label>
                <InputText
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Stack>
            </form>
            {role && <RoleUsers roleId={role.id} />}
          </Stack>
        }
        footer={
          <Flex gap={true}>
            <Link to={Route.Dashboard.Roles}>
              <Button>Go Back</Button>
            </Link>
            <Divider />
            <Button type='submit' form='role-form' disabled={!nameFormValid}>
              Submit
            </Button>
          </Flex>
        }
      />
    </PanelContainer>
  );
};

export default RoleForm;
