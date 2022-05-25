import styles from './select_box.module.css';
import React from 'react';

interface ISelect {
  value: string | number;
  onChange: (value: string) => void;
  optionList: { text: string; value: string | number }[];
}

const SelectBox = ({ value, onChange, optionList }: ISelect) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {optionList.map((option, idx) => (
        <option key={idx} className={styles.option} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default React.memo(SelectBox);
