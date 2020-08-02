import React from 'react';
import { Link } from 'gatsby';
import { orderBy } from 'lodash/collection';
import { kebabCase } from 'lodash/string';
import tw from "twin.macro";

const sortTotalCount = (tags) => orderBy(tags, ['totalCount', 'fieldValue'], ['desc']);

const Tags = ({ tags, urlPrefix }) => {
  if (!tags) {
    return null;
  }
  const Tag = tw.span`inline-block bg-base-gray-light rounded-full px-3 py-1 text-sm font-semibold text-base-font mr-2 mb-2 hover:text-accent`;

  return (
      <>
        {sortTotalCount(tags).map(tag => (
            <Link key={tag.fieldValue} to={`${urlPrefix}/${kebabCase(tag.fieldValue)}`}>
              <Tag>#{tag.fieldValue}</Tag>
            </Link>
        ))}
      </>
  )
};

export default Tags;
