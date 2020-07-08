import React from 'react';
import { Link } from 'gatsby';
import { orderBy } from 'lodash/collection';
import { kebabCase } from 'lodash/string';
import tw from "twin.macro";

const sortTotalCount = (tags) => orderBy(tags, ['totalCount', 'fieldValue'], ['desc']);

const Tags = ({ tags, urlPrefix, selectedTag }) => {
  const Tag = tw.span`inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`;

  return (
      <>
        {sortTotalCount(tags).map(tag => (
            <Link to={`${urlPrefix}/${kebabCase(tag.fieldValue)}`}>
              {tag.fieldValue === selectedTag && (
                  <Tag tw="bg-blue-200">#{tag.fieldValue}</Tag>
              )}
              {tag.fieldValue !== selectedTag && (
                  <Tag>#{tag.fieldValue}</Tag>
              )}
            </Link>
        ))}
      </>
  )
};

export default Tags;
