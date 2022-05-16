import styles from './line.module.css';
import React from 'react';

const Line = ({ width = '100%' }: { width?: string }) => {
  return <div className={styles.line} style={{ width: width }}></div>;
};

export default Line;
