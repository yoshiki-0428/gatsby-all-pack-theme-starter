import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  Configure,
  PoweredBy,
  connectStateResults,
} from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import tw from "twin.macro";
import { useSiteSecretData } from "../../hooks";

const SearchComponent = () => {
  const [showResults, setShowResults] = React.useState(false);
  const show = () => setShowResults(true);
  const hidden = () => setShowResults(false);

  const config = useSiteSecretData();
  const searchClient = algoliasearch(
      config.algoliaAppId,
      config.algoliaSearchApiKey
  );

  const FullScreen = tw.div`w-screen absolute inset-0 z-10 bg-base-gray bg-opacity-75`;
  return (
    <InstantSearch
        indexName={config.algoliaIndexName}
        searchClient={searchClient}
    >
      <Configure
        hitsPerPage={3}
        removeStopWords
        analytics
        analyticsTags={['site-search']}
      />
      <SearchBox onClick={show} />
      {showResults && (
        <FullScreen style={{height: `${document.body.offsetHeight}px`}} onClick={hidden} >
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

  return (
      <div tw="flex justify-center pt-24">
        <div tw="w-1/2"/>
        <div tw="bg-white p-2 rounded-sm shadow-xl border-solid border border-base-gray">
          {error ? <div>{error.message}</div> : null}
          {searchResults && searchResults.nbHits > 0 ? (
              <div>
                <div tw="font-bold text-xl mb-2 text-center text-gray-800">{searchState.query} 検索結果</div>
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


