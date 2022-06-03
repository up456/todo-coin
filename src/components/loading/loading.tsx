import styles from './loading.module.css';
import React from 'react';

const Loading = () => (
  <article className={styles.loadingContainer}>
    <div className={styles.loading}></div>
  </article>
);

export default Loading;
