// @flow strict
import styles from "./Divider.module.scss";
import React from "react";

type Props = {
  gridArea: {};
};

const Divider = ({ gridArea }: Props) => (
  <div className={styles['Divider']} style={gridArea} />
);

export default Divider;
