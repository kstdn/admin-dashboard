import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'shared/components/Loader';
import { selectors, slice } from 'store/slices/Roles';
import { Status } from 'util/status';

type Props = {
  value: string | undefined;
  onChange: (id: string) => void;
};

const SelectRole = ({ value, onChange }: Props) => {
  const dispatch = useDispatch();
  const status = useSelector(selectors.selectStatus);
  const roles = useSelector(selectors.selectAll);

  useEffect(() => {
    dispatch(slice.actions.load());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValueChange = (id: string) => {
    onChange(id);
  };

  if (status === Status.Loading) return <Loader />;

  return (
    <select onChange={e => handleValueChange(e.target.value)}>
      <option value={value}>Choose...</option>
      {roles.map(r => (
        <option value={r.id} key={r.id}>
          {r.name}
        </option>
      ))}
    </select>
  );
};

export default SelectRole;
