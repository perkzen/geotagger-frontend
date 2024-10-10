import React, { forwardRef } from 'react';
import { FormHelperText, TextField, TextFieldProps } from '@mui/material';
import styles from './input.module.scss';

type InputProps = TextFieldProps & { label?: string; helperText?: string };

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, ...props }, ref) => {
    return (
      <div className={styles.container}>
        {label && <label>{label}</label>}
        <TextField {...props} inputRef={ref} />
        {helperText && <FormHelperText error>{helperText}</FormHelperText>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
