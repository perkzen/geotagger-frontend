import React, { FC, forwardRef, ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';
import styles from './file-upload-input.module.scss';

type FileUploadInputProps = {
  children?: ReactNode;
  multiple?: boolean;
  accept?: string;
  variant?: ButtonProps['variant'];
};

const FileUploadInput: FC<FileUploadInputProps> = forwardRef<
  HTMLInputElement,
  FileUploadInputProps
>(
  (
    { children, accept, multiple = false, variant = 'contained', ...props },
    ref
  ) => {
    return (
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant={variant}
      >
        {children}
        <input
          {...props}
          className={styles.input}
          type="file"
          ref={ref}
          multiple={multiple}
          accept={accept}
          hidden
        />
      </Button>
    );
  }
);

FileUploadInput.displayName = 'FileUploadInput';

export default FileUploadInput;
