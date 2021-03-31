// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// default imports
const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const {metricScope, Unit} = require("aws-embedded-metrics")
const DDB = new AWS.DynamoDB({apiVersion: "2012-10-08"})

//my imports
const Binance = require('binance-api-node').default
const gClient = Binance();

// environment variables
const {TABLE_NAME, ENDPOINT_OVERRIDE, REGION} = process.env
const options = {region: REGION}
AWS.config.update({region: REGION})

if (ENDPOINT_OVERRIDE !== "") {
    options.endpoint = ENDPOINT_OVERRIDE
}

const docClient = new AWS.DynamoDB.DocumentClient(options)
// response helper
const response = (statusCode, body, additionalHeaders) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...additionalHeaders},
})

// Get cognito username from claims
function getCognitoUsername(event){
    let authHeader = event.requestContext.authorizer;
    if (authHeader !== null)
    {
        return authHeader.claims["cognito:username"];
    }
    return null;

}

// Retrieve all the items by cognito-username
function getRecords(username) {
    let params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "#username = :username",
        ExpressionAttributeNames:{
            "#username": "cognito-username"
        },
        ExpressionAttributeValues: {
            ":username": username
        }
    }

    return docClient.query(params)
}

// Get symbol info.
// async function symInfo(j, res) {
//     try {
  
//       // Start building the result json.
//     //   var res_j = {symbol : j.symbol};
  
//           var stats = await gClient.dailyStats({symbol: "ETHBTC"});
//         //   res_j.ask_price = stats.askPrice;
//         //   res_j.last_price = stats.lastPrice;
//         //   res_j.bid_price = stats.bidPrice;
  
//         return stats;
  
//     } catch (error) {
//       //res.json({error: error.toString()});
//       return error;
//     }
// }

// Lambda Handler
exports.getInfoFunc =
    metricScope(metrics =>
        async (event, context, callback) => {
            metrics.setNamespace('TodoApp')
            metrics.putDimensions({Service: "getInfoFunc"})
            metrics.setProperty("RequestId", context.requestId)

            try {
                // let username = getCognitoUsername(event);
                // let data = await getRecords(username).promise()
                const exchange = "binance";
                const symbol = "BTC_USDT";
                
                let data = await gClient.dailyStats({symbol: "ETHBTC"});
                console.log(data);
                metrics.putMetric("Success", 1, Unit.Count)
                return response(200, data)

            } catch (err) {
                metrics.putMetric("Error", 1, Unit.Count)
                console.error(err.message);
                return response(400, {message: err.message})
            }
        }
    )


/* Amplify Params - DO NOT EDIT
	AUTH_TODOAPP_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

