import React from "react";

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import Appstyle from "./App.module.css";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch,
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields,
} from "./config/config-helper";
// import { Navbar } from "./Components/Navbar";

const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
const connector = new AppSearchAPIConnector({
  searchKey,
  engineName,
  hostIdentifier,
  endpointBase,
});
const config = {
  searchQuery: {
    facets: buildFacetConfigFromConfig(),
    ...buildSearchOptionsFromConfig(),
  },
  autocompleteQuery: buildAutocompleteQueryConfig(),
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
};

export default function App() {
  const CustomResultView = ({ result, onClickLink }) => {
    console.log("custom view result", result);
    console.log("custom  onClickLink", onClickLink);

    return (
      <li className="sui-result">
        <div className="sui-result__header">
          <h3>
            {/* Maintain onClickLink to correct track click throughs for analytics*/}
            <a onClick={onClickLink} href={result.url}>
              {result.title.snippet}
            </a>
          </h3>
        </div>
        <div className="sui-result__body">
          {/* use 'raw' values of fields to access values without snippets */}
          <div className="sui-result__image">
            <img src={result.images.raw[0]} alt="" />
          </div>
          {/* Use the 'snippet' property of fields with dangerouslySetInnerHtml to render snippets */}
          <div
            className="sui-result__details"
            dangerouslySetInnerHTML={{ __html: result.description.snippet }}
          ></div>
        </div>
      </li>
    );
  };

  return (
    <>
      {/* <Navbar /> */}
      <SearchProvider config={config}>
        <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
          {({ wasSearched }) => {
            return (
              <div className="App">
                <ErrorBoundary>
                  <Layout
                    header={<SearchBox autocompleteSuggestions={true} />}
                    sideContent={
                      <div className={Appstyle.Sort_Filter_Bar}>
                        {wasSearched && (
                          <Sorting
                            label={"Sort by"}
                            sortOptions={buildSortOptionsFromConfig()}
                          />
                        )}
                        {getFacetFields().map((field) => {
                          return (
                            <Facet key={field} field={field} label={field} />
                          );
                        })}
                      </div>
                    }
                    // bodyContent={
                    //   <Results
                    //     titleField={getConfig().titleField}
                    //     urlField={getConfig().urlField}
                    //     thumbnailField={getConfig().thumbnailField}
                    //     shouldTrackClickThrough={true}
                    //   />
                    // }

                    bodyContent={<Results resultView={CustomResultView} />}
                    bodyHeader={
                      <React.Fragment>
                        {wasSearched && <PagingInfo />}
                        {wasSearched && <ResultsPerPage />}
                      </React.Fragment>
                    }
                    bodyFooter={<Paging />}
                  />
                </ErrorBoundary>
              </div>
            );
          }}
        </WithSearch>
      </SearchProvider>
    </>
  );
}
