import { Amplify, API} from 'aws-amplify';
import { withAuthenticator, Flex, Button, Heading } from '@aws-amplify/ui-react';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@aws-amplify/ui-react';
import { SearchField, ThemeProvider, Theme  } from '@aws-amplify/ui-react';
import { SearchFieldTheme} from "./SearchBar/SearchBar";
import { ScrollView } from '@aws-amplify/ui-react';
import { Footer } from "./SignIn/Footer";
import { Header } from "./SignIn/Header";
import { SignInHeader } from "./SignIn/SignInHeader";
import { SignInFooter } from "./SignIn/SignInFooter";

import { Document, Page, pdfjs} from 'react-pdf';
import SinglePagePDFViewer from "./PDF/single-page";
import AllPagePDFViewer from "./PDF/continuous-page";
import samplePDF from "./test.pdf";

import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';

import React from 'react';
import { useState, useRef } from "react";
import logo from './Images/logo.svg';
import './App.css';

Amplify.configure(awsconfig);

var data = []
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function callAPI(){
    console.log("callAPI");

    let apiName = 'ampWest2ES';
    let path = '/items';
    let myInit = {
      headers: {
        'Content-Type': 'application/json'
      }, body: {
        key: "TestValue"
      }
    }

    API.post(apiName, path, myInit
    ).then(result => {
         console.log(result);
        }).catch(err => {
         console.log(err);
    })

    data = [
          { file: "Client 1 Mark Moses Lab Result", recordDate: "8/18/22", entryDate: "8/20/22" },
          { file: "Teri Garr Patient Visit", recordDate: "8/18/22", entryDate: "8/18/22" },
          { file: "Patrick Sabin Lab Result", recordDate: "8/19/22", entryDate: "8/14/22"},
        ]

    return data;

  }

function App({ signOut, user }) {

  const [showTable, setShowTable] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  const inputRef = useRef(null);
  const searchButtonRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function esSearch(){

    inputRef.current.focus();
    alert(`You searched for ${inputRef.current.value}`);
    callAPI();
    setShowDocument(false);
    setShowTable(true);
  }

  function selectTable(rowNumber) {

    alert(data[rowNumber].file);

    setShowTable(false);
    setShowDocument(true);
  }

  return (
    <>
    <div className="App">
      <div className = "Nav">
        <Flex>
          <table className="Nav-table">
            <tr>
              <td className="Nav-left">{user.signInUserSession.accessToken.payload["cognito:groups"]}</td>
              <td className= "Nav-right">{user.username} <Button backgroundColor="white" color="#05445E" onClick={signOut}>Sign out</Button> </td>
            </tr>
          </table>
        </Flex>
      </div>
      <div className="Search-container">
        <SearchField ref={inputRef} onSubmit={esSearch}  label="" placeholder="Global Search ..." size="small" labelHidden={false}/>
      </div>
      {showTable &&  (<div className="TableClass">
        <Table highlightOnHover={true} variation="striped">
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>Record Date</TableCell>
              <TableCell>Entry Date</TableCell>
            </TableRow>
          </TableHead>
          {data.map((val, key) => {
            return (
              <TableRow key={key} onClick={() => selectTable(key)}>
                <TableCell>{val.file}</TableCell>
                <TableCell>{val.recordDate}</TableCell>
                <TableCell>{val.entryDate}</TableCell>
              </TableRow>
            )
          })}
        </Table>
      </div>)}
      {showDocument && (<div>
        show Document
        <div>
            <SinglePagePDFViewer pdf={samplePDF} />
        </div>
      </div>)}
    </div>
    </>
  );
}

export default withAuthenticator(App, {
  components: {
    Header,
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter
    },
    Footer
  }
});
