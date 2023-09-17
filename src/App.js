import React, { useState } from "react";

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import Appstyle from "./App.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";

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
import { Navbar } from "./Components/Navbar";
import { AddtoCart } from "./Components/AddtoCart";
import { Favourite } from "./Components/Favourite";

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
    // console.log(result);

    const [count, setcount] = useState(0);

    return (
      <li className="sui-result">
        <div className="sui-result__header">
          <h3>
            {/* Maintain onClickLink to correct track click throughs for analytics*/}
            <a onClick={onClickLink} href={result.url}>
              {result.title.raw}
            </a>
          </h3>
          <>
            <Favourite />
          </>
        </div>
        <div className="sui-result__body">
          {/* use 'raw' values of fields to access values without snippets */}
          <div className="sui-result__image">
            <img
              src={result.images.raw[count]}
              alt=""
              style={{ width: "100px", height: "auto" }}
            />
            <div className={Appstyle.imageIncDec}>
              <Button
                onClick={() => {
                  if (count > 0) {
                    setcount(count - 1);
                  } else setcount(result.images.raw.length - 1);
                }}
              >
                <ArrowBackIosIcon />
              </Button>
              <Button
                onClick={() => {
                  if (result.images.raw.length - 1 > count) {
                    setcount(count + 1);
                  } else setcount(0);
                }}
              >
                {" "}
                <ArrowForwardIosIcon />
              </Button>
            </div>
          </div>

          {/* Use the 'snippet' property of fields with dangerouslySetInnerHtml to render snippets */}
          <div
            className="sui-result__details"
            dangerouslySetInnerHTML={{ __html: result.description.snippet }}
          ></div>
          {/* Price */}
        </div>
        <div className={Appstyle.sui_result__price}>
          {result.discount.raw == "" ? (
            <>
              <h4>Price :${result.selling_price.raw}</h4>
            </>
          ) : (
            <h4>
              Price : <s> {result.actual_price.raw}</s>
              <> </>
              {result.discount.raw} <b>: ${result.selling_price.raw} </b>
            </h4>
          )}
        </div>
        <div className={Appstyle.sui_result__actions}>
          <div className={Appstyle.sui_result__actions_right}>
            <AddtoCart item={result} />
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      <Navbar name={"test"} />
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
