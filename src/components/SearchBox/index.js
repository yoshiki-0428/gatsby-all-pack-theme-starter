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

  const FullScreen = tw.div`w-screen absolute inset-0 z-50 bg-base-gray bg-opacity-75`;
  return (
    <InstantSearch
        indexName={config.algoliaIndexName}
        searchClient={searchClient}
    >
      <Configure
        hitsPerPage={10}
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
        <div tw="w-1/4"/>
        <div tw="bg-base-back p-6 mt-2 rounded shadow-xl border-solid border border-base-gray overflow-scroll"
             style={{maxHeight: `${document.body.offsetHeight * 0.25}px`}}>
          {error ? <div>{error.message}</div> : null}
          {searchResults && searchResults.nbHits > 0 ? (
              <div>
                <div tw="mb-2 text-center text-xl text-base-font">
                  <span tw="font-bold">{searchState.query}</span>
                  の検索結果
                </div>
                <Hits hitComponent={Hit}/>
                <PoweredBy/>
              </div>
          ) : (
              <div tw="text-base text-base-font">No results</div>
          )}
        </div>
        <div tw="w-1/4"/>
      </div>
  )
}

export const SearchWrapper = connectStateResults(SearchResult);

function Hit(props) {
  return (
      <Link to={props.hit.id}>
        <div tw="px-4 py-1">
          <div tw="text-base mb-2 text-center text-base-font">
            {props.hit.date.split("T")[0]}
          </div>
          <div tw="text-center text-xl mb-2 text-base font-bold text-base-font">
            <Highlight attribute="title" hit={props.hit} />
          </div>
          <div tw="text-center text-base text-base-font">
            <Highlight attribute="excerpt" hit={props.hit} />
          </div>
        </div>
      </Link>
  );
}


