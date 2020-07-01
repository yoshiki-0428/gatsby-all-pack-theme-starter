import React from 'react';
import { Link } from 'gatsby';
import { orderBy } from 'lodash/collection';
import { kebabCase } from 'lodash/string';
import styles from './tags.module.scss';

const sortTotalCount = (tags) => orderBy(tags, ['totalCount', 'fieldValue'], ['desc']);

const Tags = ({ tags, selectedTag }) => (
  <div className={styles["Tags"]}>
    {sortTotalCount(tags).map(tag => (
      <li key={tag.fieldValue}>
        <Link to={`/tags/${kebabCase(tag.fieldValue)}/`} className={selectedTag === tag.fieldValue ? styles['Tags--Selected'] : '' }>
          {tag.fieldValue}
          <span>{tag.totalCount}</span>
        </Link>
      </li>
    ))}
  </div>
);

export default Tags;
