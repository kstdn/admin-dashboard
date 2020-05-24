import { ResourceDto } from 'api/modules/authorization/dto/resource.dto';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'shared/components/Loader';
import { selectors, slice } from 'store/slices/Resources';
import { Status } from 'util/status';

type Props = {
  value: string | undefined;
  onChange: (resource: ResourceDto) => void;
};

const SelectResource = ({ value, onChange }: Props) => {
  const dispatch = useDispatch();
  const status = useSelector(selectors.selectStatus);
  const resources = useSelector(selectors.selectAll);

  useEffect(() => {
    dispatch(slice.actions.load());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValueChange = (id: string) => {
    onChange(resources.find(r => r.id === id) as ResourceDto);
  };

  if (status === Status.Loading) return <Loader />;

  return (
    <select onChange={e => handleValueChange(e.target.value)}>
      <option value={value}>Choose...</option>
      {resources.map(r => (
        <option value={r.id} key={r.id}>
          {r.name}
        </option>
      ))}
    </select>
  );
};

export default SelectResource;
