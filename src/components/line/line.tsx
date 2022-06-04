import styles from './line.module.css';
import React from 'react';

interface TypeLine {
  width?: string;
  heigt?: string;
  mT?: string;
  mB?: string;
}
const Line = ({
  width = '100%',
  heigt = '1.3px',
  mT = '1em',
  mB = '1em',
}: TypeLine) => {
  return (
    <div
      className={styles.line}
      style={{
        width: width,
        height: heigt,
        marginTop: mT,
        marginBottom: mB,
      }}
    ></div>
  );
};

export default React.memo(Line);
