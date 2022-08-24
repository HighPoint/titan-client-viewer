import React, { useState, useCallback } from "react";
import { Document, Page } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
//import 'react-pdf/dist/esm/Page/TextLayer.css';
import { ScrollView } from '@aws-amplify/ui-react';

function highlightPattern(text, pattern) {
  const splitText = text.split(pattern);

  if (splitText.length <= 1) {
    return text;
  }

  const matches = text.match(pattern);

  console.log(splitText);

  return splitText.reduce((arr, element, index) => (matches[index] ? [
    ...arr,
    element,
    <mark key={index}>
      {matches[index]}
    </mark>,
  ] : [...arr, element]), []);
}

export default function SinglePage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
  const [pageScale, setPageScale] = useState(1);
  const [searchText, setSearchText] = useState('');


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setPageScale(1);
  }

  function changeScale(offset){
      setPageScale(prevPageScale => prevPageScale + offset);
      setSearchText('');
  }

  function previousScale(){
    changeScale(-0.5);
  }

  function nextScale(){
    changeScale(0.5);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const textRenderer = useCallback(
    (textItem) => {
      return highlightPattern(textItem.str, searchText);
    },
    [searchText]
  );

function onChangeSearch(event) {
  setSearchText(event.target.value);
}

  const { pdf } = props;

  return (
    <>
      <ScrollView height="800px">
        <Document
          file={pdf}
          options={{ workerSrc: "/pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            scale={pageScale}
            customTextRenderer={textRenderer}
            renderTextLayer
            renderAnnotationLayer={true}/>
        </Document>
      </ScrollView>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
        <p>
          Scale
        </p>
        <button type="button" disabled={pageScale <= 1} onClick={previousScale}>
          Zoom In
        </button>
        <button
          type="button"
          disabled={pageNumber >= 4}
          onClick={nextScale}
        >
          Zoom Out
        </button>
        <div>
          <label htmlFor="search">Search:</label>
          <input type="search" id="search" value={searchText} onChange={onChangeSearch} />
        </div>
      </div>
    </>
  );
}
