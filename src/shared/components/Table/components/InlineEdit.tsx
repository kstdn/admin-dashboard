import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Check } from 'react-feather';
import { Flex } from 'shared/components/Flex';
import { IconButton } from 'shared/components/IconButton';
import { InputText } from 'shared/components/InputText';

type Props = {
  value: string;
  onChange?: (value: string) => any;
  onSubmit?: (value: string) => any;
};

const InlineEdit = ({ value: initialValue, onChange, onSubmit }: Props) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap={true}>
        <InputText value={value} onChange={handleChange} />
        <IconButton type='submit' icon={<Check />} />
      </Flex>
    </form>
  );
};

export default InlineEdit;
