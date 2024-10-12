import { FC, ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';
import styles from './file-upload-input.module.scss';

type FileUploadInputProps = {
  children?: ReactNode;
  multiple?: boolean;
  accept?: string;
  variant?: ButtonProps['variant'];
};

const FileUploadInput: FC<FileUploadInputProps> = ({
  children,
  accept,
  multiple = false,
  variant = 'contained',
}) => {
  return (
    <Button component="label" role={undefined} tabIndex={-1} variant={variant}>
      {children}
      <input
        className={styles.input}
        type="file"
        onChange={(event) => console.log(event.target.files)}
        multiple={multiple}
        accept={accept}
      />
    </Button>
  );
};

export default FileUploadInput;
