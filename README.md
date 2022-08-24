# This project was bootstrapped with Create React app

This uses AWS Amplify - primarily for the security / authentication components.

Items:

Authentication:

1) This uses Cognito. Cognito handles all the authentication with Lambda and S3 Storage. This allows the basic HIPAA security requirements to be met. (i.e. encryption in transit and encryption at rest.)

2) Using Cognito and Amplify means JWT Tokens are not needed for HIPAA requirements. However, Amplify has it's own language. Here is the cheat sheet:

Amplify API:

https://aws-amplify.github.io/amplify-js/api/

Also:

https://docs.amplify.aws/cli/restapi/restapi/
https://docs.amplify.aws/cli/storage/overview/


Amplify UI:

https://ui.docs.amplify.aws/react/components
