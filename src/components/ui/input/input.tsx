import { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import styles from './input.module.scss';

type InputProps = TextFieldProps & { label?: string };

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className={styles.container}>
        {label && <label>{label}</label>}
        <TextField {...props} inputRef={ref} />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
