# Titan Client Viewer

This uses AWS Amplify - primarily for the security / authentication components. The original project was bootstrapped with Create React app.


## Authentication

* This uses Cognito. Cognito handles all the authentication with Lambda and S3 Storage. This allows the basic HIPAA security requirements to be met. (i.e. encryption in transit and encryption at rest.)

* Using Cognito and Amplify means JWT Tokens are not needed for HIPAA requirements. However, Amplify has it's own language. Here is the cheat sheet:

Amplify API:

https://aws-amplify.github.io/amplify-js/api/

Also:

https://docs.amplify.aws/cli/restapi/restapi/
https://docs.amplify.aws/cli/storage/overview/

Amplify UI:

https://ui.docs.amplify.aws/react/components

## OpenSearch / Elastic

OpenSearch is accessed via a Lambda function. Right now it is spoofed (placeholder function).

The lambda passes:

* Client Name - 'client_name'
* Search Request - 'search_request'
* Page Number - 'page_number'

The lambda function needs to return:

* S3 document Name - created from email client_name and date.
* Document screen Name - ML (likely patient name + first line of PDF)
* Entry Date - created from email date.
* Procedure Date - ML

The Lambda function needs Environmental variables and Lambda Layer to communicate with OpenSearch.

OpenSearch records need to be modified to include the 'client_name', 'document_screen_name', 'entry_date', and 'procedure_date'. The ML needs to pass the 'document_screen_name' and 'procedure_date' back to OpenSearch.

By default, OpenSearch returns 10 items. A 'next 10' button (and 'previous 10') needs to be added.

## PDF Viewer Zoom

AWS uses this repo for the PDF Viewer in document-understanding example:

https://github.com/wojtekmaj/react-pdf

npm install react-pdf

There seems to be an error in this repo, which causes zoom scaling not to work properly. It appears that the zoom scaling changes vertically, but not horizontally. (The current PDF viewer is only set up to understand the issue.)

The pure javascript repo, pdf.js, does not have this issue. In CodeSandBox, this React repo appears to work:

https://github.com/intelllex/react-pdf

npm install @intelllex/react-pdf

This repo, however, has not been tested in Amplify.

## Annotations

* Needs ML output to create annotation JSON. The annotation needs bounding boxes (bbox). The ML output (that I saw) has refs to the Textract blocks, so this needs to be tied together (server-side).

* https://github.com/wojtekmaj/react-pdf repo has the css for the pdf.js annotation layer.

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

Example Annotation in TypeScript (no zoom):

https://github.com/agentcooper/react-pdf-highlighter

## Understanding PDF layers

Here is my understand of the PDF layers from the code:

1) canvas layer - base layer.
2) text layer - middle layer.
3) annotation layer - top layer.

Canvas layer contains the images. You can draw directly on it. i.e.

ctx.fillRect(x,y,width,height);

The above is an example, however, DON'T DO THIS.

Text Layer is where the "Find" function highlights text.

Annotation Layer is where the Annotations are. This layer can be used for annotation 'highlights'. If necessary, you can likely also use the Text Layer for annotations.

Drawing on the canvas layer will likely either require a reloading of the doc or increased memory so that you can 'remove' any highlights.

## CSS

Fix it all. Amplify has color themes, which can be set or customize each component individually.

## React code

React code is set up 'quick and dirty'. Fix it. It needs to be cleaned up.

## Next.js

This can be converted to Next.js, but my goal was to get this working in React first. Amplify supports React. My first attempt to use Next.js was unsuccessful, but AWS has added documentation in the last two weeks.

https://docs.amplify.aws/start/q/integration/next/
