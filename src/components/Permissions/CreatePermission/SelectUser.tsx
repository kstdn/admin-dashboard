import React, { useEffect } from 'react';
import { Loader } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, slice } from 'store/slices/Users';
import { Status } from 'util/status';

type Props = {
  value: string | undefined;
  onChange: (id: string) => void;
};

const SelectUser = ({ value, onChange }: Props) => {
  const dispatch = useDispatch();
  const status = useSelector(selectors.selectStatus);
  const users = useSelector(selectors.selectAll);

  useEffect(() => {
    dispatch(slice.actions.load());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValueChange = (id: string) => {
    onChange(id);
  };

  if (status === Status.Idle) return null;
  if (status === Status.Loading) return <Loader />;

  return (
    <select value={value} onChange={e => handleValueChange(e.target.value)}>
      <option value=''>Choose...</option>
      {users.map(u => (
        <option value={u.id} key={u.id}>
          {u.username}
        </option>
      ))}
    </select>
  );
};

export default SelectUser;
