import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFound = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>GGVP</span>
        <br />
        Page not found
      </h1>
    </div>
  );
};

export default NotFound;
