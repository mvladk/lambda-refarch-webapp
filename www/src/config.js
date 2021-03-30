// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "46v2723ac9urm1gptu9amd4arp",     // CognitoClientID
  "api_base_url": "https://16ct223z28.execute-api.eu-west-1.amazonaws.com/staging",                                     // TodoFunctionApi
  "cognito_hosted_domain": "mytodoappdemo-lambda-refarch-webapp-try.auth.eu-west-1.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d17rlbo51pd4ys.amplifyapp.com"                                      // AmplifyURL
};

export default config;
