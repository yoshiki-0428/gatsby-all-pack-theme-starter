import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import styles from './Feed.module.scss';
import Image from "../Image";
import tw from "twin.macro"

const Feed = ({ edges }) => {
  const Main = tw.div`max-w-md rounded overflow-hidden shadow-lg mb-12`;
  const Img = tw.img`w-full`;
  const Content = tw.div`px-6 py-4`;
  const ContentText = tw.div`font-bold text-xl mb-2`;
  const ContentExcerpt = tw.p`text-gray-700 text-base`;

  return (
      <div>
        {edges.map((edge) => (
            <Main>
              <Img src={edge.node.frontmatter.socialImage}/>
              <Content>
                <ContentText>{edge.node.frontmatter.title}</ContentText>
                <ContentExcerpt>{edge.node.excerpt}</ContentExcerpt>
              </Content>
            </Main>
        ))}
      </div>
  )


  // return (
  //   <div className={styles['feed']}>
  //     {edges.map((edge) => (
  //       <div className={styles['feed__item']} key={edge.node.fields.slug}>
  //         <div className={styles['feed__item-meta']}>
  //           <time className={styles['feed__item-meta-time']} dateTime={moment(edge.node.frontmatter.date).format('YYYY/MM/DD')}>
  //             {moment(edge.node.frontmatter.date).format('YYYY/MM/DD')}
  //           </time>
  //           <span className={styles['feed__item-meta-divider']} />
  //           <span className={styles['feed__item-meta-category']}>
  //             <Link to={edge.node.fields.categorySlug} className={styles['feed__item-meta-category-link']}>{edge.node.frontmatter.category}</Link>
  //           </span>
  //         </div>
  //         <div className={styles['feed__item-content']}>
  //
  //           {edge.node.frontmatter.socialImage && (
  //             <Link to={edge.node.fields.slug} className={styles['feed__item-content__img']}>
  //               <Image
  //                 resolutions="large"
  //                 lazy={false}
  //                 src={edge.node.frontmatter.socialImage}
  //                 alt={''}
  //               />
  //             </Link>
  //           )}
  //
  //           <div>
  //             <h2 className={styles['feed__item-title']}>
  //               <Link className={styles['feed__item-title-link']} to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
  //             </h2>
  //             <p className={styles['feed__item-description']}>{edge.node.excerpt}</p>
  //             <Link className={styles['feed__item-readmore']} to={edge.node.fields.slug}>Read</Link>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // )
};

export default Feed;
