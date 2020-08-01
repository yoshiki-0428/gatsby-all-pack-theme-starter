import React from 'react';
import { Link } from 'gatsby';
import { PAGINATION } from '../../constants';
import tw from "twin.macro"

const Index = ({
  prevPagePath,
  nextPagePath,
  hasNextPage,
  hasPrevPage
}) => {
  const Button = tw.button`bg-transparent py-2 px-4 border border-base-gray rounded`;

  return (
    <div tw="mt-2 flex">
      <div tw="w-1/2 text-left text-base-font">
        {hasPrevPage && (
            <Link rel="prev" to={hasPrevPage ? prevPagePath : '/'}>
              <Button>
                {PAGINATION.PREV_PAGE}
              </Button>
            </Link>
        )}
      </div>
      <div tw="w-1/2 text-right text-base-font">
        {hasNextPage && (
            <Link rel="prev" to={hasNextPage ? nextPagePath : '/'}>
              <Button>
                {PAGINATION.NEXT_PAGE}
              </Button>
            </Link>
        )}
      </div>
    </div>
  );
};

export default Index;
