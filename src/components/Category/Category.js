// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import { orderBy } from 'lodash/collection';
import { kebabCase } from 'lodash/string';
import styles from './Category.module.scss';

type Props = {
  category: any,
  selectedCategory: string;
};

const sortTotalCount = (sortArray) => orderBy(sortArray, ['totalCount', 'fieldValue'], ['desc']);

const Category = ({ category, selectedCategory }: Props) => (
  <div className={styles["Category"]}>
    {sortTotalCount(category.map(c => (
      <li key={c.fieldValue}>
        <Link to={`/category/${kebabCase(c.fieldValue)}/`} className={selectedCategory === c.fieldValue ? styles['Category--Selected'] : '' }>
          {c.fieldValue}
          <span>{c.totalCount}</span>
        </Link>
      </li>
    )))}
  </div>
);

export default Category;
