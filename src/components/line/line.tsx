import styles from './line.module.css';
import React from 'react';

interface TypeLine {
  width?: string;
  mT?: string;
  mB?: string;
}
const Line = ({ width = '100%', mT = '1em', mB = '1em' }: TypeLine) => {
  return (
    <div
      className={styles.line}
      style={{
        width: width,
        marginTop: mT,
        marginBottom: mB,
      }}
    ></div>
  );
};

export default Line;
