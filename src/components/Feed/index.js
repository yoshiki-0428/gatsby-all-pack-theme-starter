import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import "twin.macro";
import tw from "twin.macro"
import Image from "../Image";
import Tags from "../Tags/";

const Feed = ({ edges, tags }) => {
  // tailwindcss
  const Main = tw.div`w-full rounded overflow-hidden shadow-lg mb-10 bg-white`;
  const Content = tw.div`px-6 py-4`;
  const ContentDate = tw.div`text-base mb-2 text-center`;
  const ContentText = tw.div`font-bold text-xl mb-2 text-center text-gray-800 hover:underline`;
  const ContentCategory = tw.div`text-base mb-2 text-center text-blue-600`;
  const ContentExcerpt = tw.p`text-gray-700 text-center text-base`;
  const ButtonWrap = tw.div`pt-0 pb-4 text-center`;
  const Button = tw.button`bg-transparent hover:underline font-semibold py-2 px-4 border rounded`;

  console.log(tags);
  return (
      <div>
        {edges.map((edge) => (
            <Main>
              <Content>
                <ContentDate>
                  <time dateTime={moment(edge.node.frontmatter.date).format('YYYY/MM/DD')}>
                    {moment(edge.node.frontmatter.date).format('YYYY/MM/DD')}
                  </time>
                </ContentDate>
                <ContentText>
                  <Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
                </ContentText>

                <ContentCategory>
                  <Link to={edge.node.fields.categorySlug}>
                    {edge.node.frontmatter.category}
                  </Link>
                </ContentCategory>
              </Content>
              <Link to={edge.node.fields.slug}>
                <Image
                  background
                  resolutions="small"
                  alt={''}
                  src={edge.node.frontmatter.socialImage}
                />
                {/*<Img src={edge.node.frontmatter.socialImage}/>*/}
              </Link>
              <Content>
                <ContentExcerpt>{edge.node.excerpt}</ContentExcerpt>
                <ButtonWrap>
                  <Link to={edge.node.fields.slug}>
                    <Button>
                      READ MORE
                    </Button>
                  </Link>
                </ButtonWrap>

                <Tags tags={tags} urlPrefix={'tags'}/>
              </Content>
            </Main>
        ))}
      </div>
  )
};

export default Feed;
