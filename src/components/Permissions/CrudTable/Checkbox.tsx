import React from 'react';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox = ({ checked, onChange }: Props) => {
  return (
    <input
      type='checkbox'
      checked={checked}
      onChange={e => onChange(e.target.checked)}
    />
  );
};

export default Checkbox;
