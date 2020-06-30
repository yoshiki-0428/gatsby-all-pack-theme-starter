// @flow strict
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './Feed.module.scss';
import Image from "../Image";

type Props = {
  edges: Edges
};

const Feed = ({ edges }: Props) => (
  <div className={styles['feed']}>
    {edges.map((edge) => (
      <div className={styles['feed__item']} key={edge.node.fields.slug}>
        <div className={styles['feed__item-meta']}>
          <time className={styles['feed__item-meta-time']} dateTime={moment(edge.node.frontmatter.date).format('YYYY/MM/DD')}>
            {moment(edge.node.frontmatter.date).format('YYYY/MM/DD')}
          </time>
          <span className={styles['feed__item-meta-divider']} />
          <span className={styles['feed__item-meta-category']}>
            <Link to={edge.node.fields.categorySlug} className={styles['feed__item-meta-category-link']}>{edge.node.frontmatter.category}</Link>
          </span>
        </div>
        <div className={styles['feed__item-content']}>

          {edge.node.frontmatter.socialImage && (
            <Link to={edge.node.fields.slug} className={styles['feed__item-content__img']}>
              <Image
                resolutions="large"
                lazy={false}
                src={edge.node.frontmatter.socialImage}
                alt={''}
              />
            </Link>
          )}

          <div>
            <h2 className={styles['feed__item-title']}>
              <Link className={styles['feed__item-title-link']} to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
            </h2>
            <p className={styles['feed__item-description']}>{edge.node.excerpt}</p>
            <Link className={styles['feed__item-readmore']} to={edge.node.fields.slug}>Read</Link>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Feed;
