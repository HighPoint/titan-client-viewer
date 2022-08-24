export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "ampwest212781286": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "storage": {
        "pdfS3": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "ampWest2ES": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "ampWest2ES": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}