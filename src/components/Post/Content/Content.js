// @flow strict
import React from 'react';
import styles from './Content.module.scss';

type Props = {
  body: string,
  title: string
};

const Content = ({ body, title }: Props) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    <div className={styles['content__inner']}>
      <div className={styles['content__inner__body']} dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  </div>
);

export default Content;
