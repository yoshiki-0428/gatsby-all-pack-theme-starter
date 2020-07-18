import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import "twin.macro";
import tw from "twin.macro"
import Tags from "../Tags/";
import ImageWrap from "../Image/ImageWrap";

const Feed = ({ edges, tags }) => {
  const Main = tw.div`w-full rounded overflow-hidden shadow-lg mb-10 bg-white`;
  const Content = tw.div`px-6 py-4`;
  const ContentDate = tw.div`text-base mb-2 text-center`;
  const ContentText = tw.div`font-bold text-xl mb-2 text-center text-gray-800 hover:underline`;
  const ContentCategory = tw.div`text-base mb-2 text-center text-blue-600`;
  const ContentExcerpt = tw.p`text-gray-700 text-center text-base`;
  const ButtonWrap = tw.div`pt-0 pb-4 text-center`;
  const Button = tw.button`bg-transparent hover:underline font-semibold py-2 px-4 border rounded`;

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
                  <Link tw="text-gray-700 no-underline" to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
                </ContentText>

                <ContentCategory>
                  <Link tw="no-underline" to={edge.node.fields.categorySlug}>
                    {edge.node.frontmatter.category}
                  </Link>
                </ContentCategory>
              </Content>
              <Link to={edge.node.fields.slug}>
                <ImageWrap
                    size={'normal'}
                    item={{ socialImage: edge.node.frontmatter.socialImage }} />
              </Link>
              <Content>
                <ContentExcerpt>{edge.node.excerpt}</ContentExcerpt>
                <ButtonWrap>
                  <Link tw="text-gray-700 no-underline" to={edge.node.fields.slug}>
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
