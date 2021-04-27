# LaraBot
A prototype of a serverless chatbot architecture.


## Intallation && Setup

Install serverless CLI
```
npm install -g serverless
```

Setup serverless
```
serverless config credentials --provider aws --profile $AWS_USER_PROFILE --key $AWS_KEY_ID --secret $AWS_SECRET
```

## First project

Create project selecting a template. [See docs](https://www.serverless.com/framework/docs/providers/aws/cli-reference/create/).
```
serverless create --template aws-nodejs --name firstProject --path firstProject
```

Deploy function
```
cd firstProject
serverless deploy
```
