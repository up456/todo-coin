import styles from './edit_item_page.module.css';
import React, { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/button/button';
import { TypeItem, UserIdContext } from '../../App';
import NonExistentUser from '../../components/non_existent_user/non_existent_user';
import { TypeEditItemState } from '../../components/item_card/item_card';
import FileInput from '../../components/fileInput/fileInput';
import IconInput from '../../components/iconInput/iconInput';
import ImageUploader from '../../service/ImageUploader';

interface TypeEditItemPage {
  editItem: (targetNumber: string, value: TypeItem) => void;
  imageUploader: ImageUploader;
}

const EditItemPage = ({ editItem, imageUploader }: TypeEditItemPage) => {
  const navigate = useNavigate();
  const itemRef = useRef<HTMLInputElement>(null);
  const { state } = useLocation() as TypeEditItemState;
  const { itemNumber, item } = state;
  const [inputValue, setInputValue] = useState(item);
  const isIconCase = inputValue.imgUrl.includes('icon_list');

  const [file, setFile] = useState({
    name: isIconCase ? '' : inputValue.imgName,
    url: isIconCase ? '' : inputValue.imgUrl,
  });
  const [icon, setIcon] = useState({
    name: isIconCase ? inputValue.imgName : '',
    url: isIconCase ? inputValue.imgUrl : '',
  });

  const userId = useContext(UserIdContext);
  if (!userId) return <NonExistentUser />;

  const onChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputKey: string
  ) => {
    setInputValue((prevInputValue) => {
      let value: string | number = event.target.value;
      if (inputKey === 'itemLv' || inputKey === 'itemPrice') {
        value = parseInt(value);
      }
      return { ...prevInputValue, [inputKey]: value };
    });
  };

  const onSubmit = () => {
    if (inputValue.itemTitle.length < 1) {
      return itemRef.current?.focus();
    }
    const finalInputValue = {
      ...inputValue,
      imgUrl: file.url || icon.url,
      imgName: file.name || icon.name,
    };
    editItem(itemNumber, finalInputValue);
    navigate(-1);
  };

  return (
    <section className={styles.addItemPage}>
      <section className={styles.addItemHeader}>
        <div className={styles.backArrow} onClick={() => navigate(-1)}>
          <img src="/asset/arrow_left.png" alt="arrow_left" />
        </div>
        <h2 className={styles.headerTitle}>{`아이템 제작`}</h2>
      </section>
      <form className={styles.addItemBody}>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>아이템 이름</label>
          <input
            ref={itemRef}
            type="text"
            className={styles.input}
            placeholder={'to-do'}
            value={inputValue.itemTitle}
            onChange={(event) => onChangeValue(event, 'itemTitle')}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>레벨 제한</label>
          <input
            type="number"
            className={styles.input}
            value={inputValue.itemLv}
            min={0}
            onChange={(event) => onChangeValue(event, 'itemLv')}
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLable}>아이템 비용</label>
          <input
            type="number"
            className={styles.input}
            value={inputValue.itemPrice}
            min={0}
            onChange={(event) => onChangeValue(event, 'itemPrice')}
          />
        </div>
        <div className={styles.inputBox}>
          <div className={styles.labelBox}>
            <label className={styles.inputLable}>이미지</label>
            <label className={styles.inputLable}>미리보기</label>
          </div>
          <div className={styles.fileInputBox}>
            <div className={styles.inputContainer}>
              <FileInput
                setFile={setFile}
                setIcon={setIcon}
                imageUploader={imageUploader}
                name={file.name}
              />
              <label className={styles.inputLable}>아이콘</label>
              <IconInput setFile={setFile} setIcon={setIcon} name={icon.name} />
            </div>
            <div className={styles.previewImgBox}>
              <div
                className={
                  icon.name
                    ? `${styles.previewImg} ${styles.iconCase}`
                    : styles.previewImg
                }
                style={{ backgroundImage: `url(${file.url || icon.url})` }}
              />
            </div>
          </div>
        </div>
      </form>
      <section className={styles.addItemFooter}>
        <Button text="제작하기" onClick={onSubmit} />
      </section>
    </section>
  );
};

export default EditItemPage;
