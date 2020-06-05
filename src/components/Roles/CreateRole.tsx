import { createRole } from 'api';
import { CREATE_ERROR, CREATE_SUCCESS } from 'messages';
import React, { useState } from 'react';
import { Check, Loader, X } from 'react-feather';
import { Button } from 'shared/components/Button';
import { IconButton } from 'shared/components/IconButton';
import { InputText } from 'shared/components/InputText';
import { ProgressTile } from 'shared/components/ProgressTile';
import Temporary from 'shared/components/Temporary';
import { Status } from 'util/status';

type Props = {
  onSuccess?: Function;
};

const CreateRole = ({ onSuccess }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState<string>('');

  const [status, setStatus] = useState(Status.Idle);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const isLoading = status === Status.Loading;

  const handleChange = (value: string) => {
    if (error) {
      setError(undefined);
    }

    setName(value);
  };

  const handleSave = async () => {
    if (!name) return;

    try {
      setStatus(Status.Loading);
      await createRole(name);
      setStatus(Status.Resolved);
      setName('');
      setExpanded(false);
      setMessage(`${CREATE_SUCCESS}`);
      onSuccess && onSuccess();
    } catch {
      setStatus(Status.Rejected);
      setName('');
      setError(CREATE_ERROR);
    }
  };

  const handleCancel = () => {
    setName('');
    setExpanded(false);
  };

  return expanded ? (
    <>
      <InputText value={name} onChange={e => handleChange(e.target.value)} />
      {error && (
        <Temporary duration={3000}>
          <ProgressTile color='danger' duration={3000}>
            {error}
          </ProgressTile>
        </Temporary>
      )}
      {isLoading ? (
        <IconButton icon={<Loader />} />
      ) : (
        <>
          <IconButton
            disabled={!name}
            onClick={() => handleSave()}
            icon={<Check />}
          />
          <IconButton onClick={handleCancel} icon={<X />} />
        </>
      )}
    </>
  ) : (
    <>
      <Button onClick={() => setExpanded(true)}>Create new</Button>
      {message && (
        <Temporary duration={3000}>
          <ProgressTile color='success' duration={3000}>
            {message}
          </ProgressTile>
        </Temporary>
      )}
    </>
  );
};

export default CreateRole;
