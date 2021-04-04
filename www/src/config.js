// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "6kqnupp8ufemm8cpue458f6amp",     // CognitoClientID
  "api_base_url": "https://r70cf62z4m.execute-api.eu-west-1.amazonaws.com/staging",                                     // TodoFunctionApi
  "cognito_hosted_domain": "mytodoappdemo-todo-sam-app.auth.eu-west-1.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d35ovsz4w5pabt.amplifyapp.com"                                      // AmplifyURL
};

export default config;
