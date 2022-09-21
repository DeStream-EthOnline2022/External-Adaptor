# External Adapter

## Technical Architecture

WIP

---

## To BUIDL

- template from the [Serverless framework](https://www.serverless.com/).

## Installation/deployment instructions

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

### Locally

In order to test the hello function locally, run the following command:

- `npx sls invoke local -f hello --path src/functions/hello/mock.json` if you're using NPM
- `yarn sls invoke local -f hello --path src/functions/hello/mock.json` if you're using Yarn

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

> baseUrl: https://2bgej4zdf8.execute-api.ap-northeast-1.amazonaws.com/dev

```console
$ curl "https://2bgej4zdf8.execute-api.ap-northeast-1.amazonaws.com/dev/stores"

$ curl "https://{$base-url}/store?stores"

$ curl -X POST -H "Content-Type: application/json" -d '{"squareId":"d3kmadad0", "storeName":"30dreams", "addressLine1":"2910 JAO qupaqupa", "country":"US", "postalCode": "22300"}' "https://{$base-url}/dev/store"
```
