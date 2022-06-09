// import styles from './datalist.module.css';
import React from 'react';

interface TypeDatalist {
  inputId: string;
  opitons: string[];
}

const Datalist = ({ inputId, opitons }: TypeDatalist) => {
  return (
    <datalist id={inputId}>
      {opitons.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </datalist>
  );
};

export default Datalist;
