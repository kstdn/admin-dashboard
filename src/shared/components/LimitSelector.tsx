import React from 'react';
import { Button } from './Button';
import ButtonGroup from './ButtonGroup';

const limitOptions = [5, 10, 20];

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const LimitSelector = ({ value, onChange }: Props) => {
  return (
    <ButtonGroup>
      {limitOptions.map(lo => (
        <Button
          onClick={() => onChange(lo)}
          forceActive={value === lo}
          key={lo}
        >
          {lo}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default LimitSelector;
