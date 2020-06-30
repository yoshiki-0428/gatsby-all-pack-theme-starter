// @flow strict
import React from 'react';
import styles from './Toc.module.scss';

type Props = {
  tableOfContents: string,
  gridArea: {}
};

const Toc = ({ tableOfContents, gridArea }: Props) => (
  <div className={styles.toc} dangerouslySetInnerHTML={{ __html: tableOfContents }} style={gridArea} />
);

export default Toc;
