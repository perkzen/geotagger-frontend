import React, { FC, forwardRef, ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';
import classNames from 'classnames';
import styles from './file-upload-input.module.scss';

type FileUploadInputProps = {
  children?: ReactNode;
  multiple?: boolean;
  accept?: string;
  variant?: ButtonProps['variant'];
  className?: string;
};

const FileUploadInput: FC<FileUploadInputProps> = forwardRef<
  HTMLInputElement,
  FileUploadInputProps
>(
  (
    {
      children,
      accept,
      multiple = false,
      variant = 'contained',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant={variant}
        className={classNames(styles.container, className)}
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
