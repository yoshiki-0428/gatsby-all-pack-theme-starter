import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  Configure,
  PoweredBy, Panel,
  connectStateResults,
} from 'react-instantsearch-dom';
import "twin.macro"
import "./ais.css"
import { Link } from 'gatsby';
import tw from "twin.macro"

// TODO env
const searchClient = algoliasearch(
    'XIKSJSCPJ3',
    'a0eb781d9e8354258d74c311a05f0cc1'
);

const SearchComponent = () => {
  const [showResults, setShowResults] = React.useState(false);
  const show = () => setShowResults(true);
  const hidden = () => setShowResults(false);

  const FullScreen = tw.div`w-screen absolute inset-0 z-10`;
  return (
    <InstantSearch
        indexName={'BLOG'}
        searchClient={searchClient}
    >
      <Configure
        hitsPerPage={5}
        removeStopWords
        analytics
        analyticsTags={['site-search']}
      />
      <SearchBox onClick={show} />
      {showResults && (
        <FullScreen onClick={hidden} >
          <SearchWrapper />
        </FullScreen>
      )}
    </InstantSearch>
  )
};

export default SearchComponent;

/**
 * @return {null}
 */
function SearchResult(props) {
  const { searchState, searchResults, error } = props;

  if (searchState && !searchState.query) {
    return null;
  }

  return (
      <div tw="flex justify-center pt-48">
        <div tw="w-1/2"/>
        <div tw="bg-white p-2 rounded-sm shadow-xl border-solid border border-gray-800 ">
          {error ? <div>{error.message}</div> : null}
          {searchResults && searchResults.nbHits > 0 ? (
              <div>
                <div tw="font-bold text-xl mb-2 text-center text-gray-800">{searchState.query}の検索結果</div>
                <Hits hitComponent={Hit}/>
                <PoweredBy/>
              </div>
          ) : (
              <div>No results</div>
          )}
        </div>
        <div tw="w-1/2"/>
      </div>
  )
}

export const SearchWrapper = connectStateResults(SearchResult);

function Hit(props) {
  const ContentDate = tw.div`text-base mb-2 text-center`;
  const ContentText = tw.div`font-bold text-xl mb-2 text-center text-gray-800 hover:underline`;
  const ContentCategory = tw.div`text-base mb-2 text-center text-blue-600`;
  const ContentExcerpt = tw.p`text-gray-700 text-center text-base`;

  return (
      <div>
        <Link to={props.hit.id}>
          <div tw="text-base mb-2 text-center">
            {props.hit.date.split("T")[0]}
          </div>
          <div tw="font-bold text-xl mb-2 text-base text-gray-800">
            <Highlight attribute="title" hit={props.hit} />
          </div>
          <div tw="text-gray-700 text-center text-base">
            <Highlight attribute="excerpt" hit={props.hit} />
          </div>
        </Link>
      </div>
  );
}


