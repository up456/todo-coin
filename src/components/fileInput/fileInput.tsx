import styles from './fileInput.module.css';
import React, { useRef, useState } from 'react';
import Loading from '../loading/loading';
import ImageUploader from '../../service/ImageUploader';

interface TypeFileInput {
  setFile: React.Dispatch<
    React.SetStateAction<{
      name: string;
      url: string;
    }>
  >;
  setIcon: React.Dispatch<
    React.SetStateAction<{
      name: string;
      url: string;
    }>
  >;
  imageUploader: ImageUploader;
  name: string;
}

const FileInput = ({
  setFile,
  setIcon,
  imageUploader,
  name,
}: TypeFileInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickFileInputBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    inputRef.current?.click();
  };

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = event.target.files?.item(0);
    if (file) {
      const result = await imageUploader.upload(file);
      setFile({
        name: `${result.original_filename}.${result.format}`,
        url: result.url,
      });
      setIcon({ name: '', url: '' });
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.fileInputCotainer}>
      <input
        onChange={onChangeFile}
        type="file"
        ref={inputRef}
        className={styles.inputTag}
      />
      <div className={styles.fileInput}>
        {isLoading ? (
          <Loading />
        ) : (
          <button className={styles.fileInputBtn} onClick={onClickFileInputBtn}>
            {name === '' ? `이미지 선택` : name}
          </button>
        )}
      </div>
    </div>
  );
};

export default FileInput;
