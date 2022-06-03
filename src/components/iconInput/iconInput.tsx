import styles from './iconInput.module.css';
import React, { useRef } from 'react';

const ICON_LIST = [
  { src: '/asset/icon_list/birthday.svg', alt: 'birthday' },
  { src: '/asset/icon_list/react.svg', alt: 'react' },
  { src: '/asset/icon_list/aws.svg', alt: 'aws' },
  { src: '/asset/icon_list/icecream.svg', alt: 'icecream' },
  { src: '/asset/icon_list/baby.svg', alt: 'baby' },
  { src: '/asset/icon_list/basketball.svg', alt: 'basketball' },
  { src: '/asset/icon_list/music.svg', alt: 'music' },
  { src: '/asset/icon_list/sleep.svg', alt: 'sleep' },
  { src: '/asset/icon_list/bath.svg', alt: 'bath' },
  { src: '/asset/icon_list/bicycle.svg', alt: 'bicycle' },
  { src: '/asset/icon_list/car.svg', alt: 'car' },
  { src: '/asset/icon_list/airplane.svg', alt: 'airplane' },
  { src: '/asset/icon_list/cut.svg', alt: 'cut' },
  { src: '/asset/icon_list/tea.svg', alt: 'tea' },
  { src: '/asset/icon_list/bone.svg', alt: 'bone' },
  { src: '/asset/icon_list/drawing.svg', alt: 'drawing' },
  { src: '/asset/icon_list/photo.svg', alt: 'photo' },
  { src: '/asset/icon_list/plants.svg', alt: 'plants' },
  { src: '/asset/icon_list/church.svg', alt: 'church' },
  { src: '/asset/icon_list/guitar.svg', alt: 'guitar' },
  { src: '/asset/icon_list/call.svg', alt: 'call' },
  { src: '/asset/icon_list/youtube.svg', alt: 'youtube' },
  { src: '/asset/icon_list/pizza.svg', alt: 'pizza' },
  { src: '/asset/icon_list/hotdog.svg', alt: 'hotdog' },
  { src: '/asset/icon_list/game.svg', alt: 'game' },
  { src: '/asset/icon_list/cart.svg', alt: 'cart' },
  { src: '/asset/icon_list/cat.svg', alt: 'cat' },
  { src: '/asset/icon_list/book.svg', alt: 'book' },
  { src: '/asset/icon_list/bolt.svg', alt: 'bolt' },
  { src: '/asset/icon_list/bread.svg', alt: 'bread' },
];

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
  name: string;
}

const IconInput = ({ setFile, setIcon, name }: TypeFileInput) => {
  const itemListRef = useRef<HTMLUListElement>(null);

  const onClickIconInputBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    itemListRef.current?.classList.toggle(`${styles.hidden}`);
  };

  const onClickIcon = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const name = event.currentTarget.getAttribute('alt');
    const url = event.currentTarget.getAttribute('src');
    console.log(url);

    if (name && url) {
      setIcon({ name, url });
      setFile({ name: '', url: '' });
    }
  };

  return (
    <div className={styles.iconInputCotainer}>
      <div className={styles.iconInput}>
        <button className={styles.IconInputBtn} onClick={onClickIconInputBtn}>
          {name === '' ? `아이콘 선택` : name}
        </button>
        <ul className={styles.iconList} ref={itemListRef}>
          {ICON_LIST.map((icon, idx) => (
            <li className={styles.iconBox} key={idx}>
              <img
                className={styles.icon}
                src={icon.src}
                alt={icon.alt}
                onClick={onClickIcon}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IconInput;
