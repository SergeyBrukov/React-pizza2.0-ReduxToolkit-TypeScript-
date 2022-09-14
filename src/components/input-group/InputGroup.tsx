import { ChangeEvent, FC, HTMLProps, useRef, useState } from 'react';

import {
  StyledError,
  StyledInput,
  StyledInputGroup,
  StyledInputWrapper,
  StyledLabel,
  StyledPasswordEye,
} from './styleInputGroup';

interface IInputGroup extends HTMLProps<HTMLInputElement> {
  id?: string;
  label?: string;
  type?: string;
  value?: string;
  className?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  maxLength?: number;
  clearValue: () => void;
  autocomplete?: string;
  error?: string;
  setValue?: () => void;
}

const InputGroup: FC<IInputGroup> = ({
  id,
  label,
  type,
  value,
  className,
  handleChange,
  name,
  maxLength,
  clearValue,
  autocomplete,
  error,
  setValue,
  ...otherProps
}) => {
  const inputRef = useRef<HTMLInputElement>();

  const handlerClearValue = () => {
    clearValue();
    inputRef.current?.focus();
  };

  return (
    <StyledInputGroup className={`input-group ${className}`} type={type}>
      {label && <StyledLabel htmlFor={id}>{label}:</StyledLabel>}
      <StyledInputWrapper error={error}>
        <StyledInput
          type={type ? type : 'text'}
          id={id}
          ref={inputRef}
          name={name}
          autoComplete={autocomplete}
          maxLength={maxLength}
          onChange={handleChange}
          value={value}
          {...otherProps}
        />
        {value && value.length > 0 && (
          <StyledPasswordEye type="button" onClick={handlerClearValue}>
            ❌
          </StyledPasswordEye>
        )}
      </StyledInputWrapper>
      {error && <StyledError>{error}</StyledError>}
    </StyledInputGroup>
  );
};

export default InputGroup;
