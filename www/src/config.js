// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "4fbgbmnhkg5lhl0bvijd5n1u8b",     // CognitoClientID
  "api_base_url": "https://1akunnlii3.execute-api.eu-west-1.amazonaws.com/staging",                                     // TodoFunctionApi
  "cognito_hosted_domain": "exchange-exchange-lambda-lib.auth.eu-west-1.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d1wjiz0vgchd5s.amplifyapp.com"                                      // AmplifyURL
};

export default config;
