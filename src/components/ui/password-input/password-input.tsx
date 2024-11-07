import React, { forwardRef, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material';
import styles from './password-input.module.scss';

type PasswordInputProps = Omit<
  OutlinedInputProps & { label?: string; helperText?: string },
  'type' | 'endAdornment'
>;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, helperText, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prev) => !prev);

    return (
      <div className={styles.container}>
        {label && <label>{label}</label>}
        <OutlinedInput
          {...props}
          type={showPassword ? 'text' : 'password'}
          inputRef={ref}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePassword}
                onMouseDown={(e) => e.preventDefault()} // Prevent losing focus on mouse down
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {helperText && <FormHelperText error>{helperText}</FormHelperText>}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
