import styles from './toggle_section.module.css';
import React, { useState } from 'react';

interface TypeToggleSection {
  title: string;
  children: JSX.Element;
  defaultType?: boolean;
}

const ToggleSection = ({
  title,
  children,
  defaultType = false,
}: TypeToggleSection) => {
  const [onFocus, setOnFocus] = useState(defaultType);

  const onClickHeader = () => {
    setOnFocus(!onFocus);
  };

  return (
    <section
      className={
        onFocus
          ? `${styles.toggleSection} ${styles.onFocus}`
          : styles.toggleSection
      }
    >
      <div className={styles.sectionHeader} onClick={onClickHeader}>
        {onFocus ? (
          <img
            className={styles.checkIcon}
            src="asset/check_on.svg"
            alt="check-off"
          />
        ) : (
          <img
            className={styles.checkIcon}
            src="asset/check_off.svg"
            alt="check-off"
          />
        )}
        <div className={styles.sectionTitle}>{title}</div>
        {onFocus ? (
          <button className={`${styles.toggleBtn} ${styles.onFocus}`}>
            올려서 닫기
          </button>
        ) : (
          <button className={styles.toggleBtn}>내려서 보기</button>
        )}
      </div>

      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
};

export default ToggleSection;
