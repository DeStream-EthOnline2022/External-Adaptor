import type { AWS } from "@serverless/typescript";

import store from "@functions/store";

const serverlessConfiguration: AWS = {
  service: "external-adapter",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    stage: "${opt:stage, self:custom.defaultStage}",
    profile: "${self:custom.environment.${self:provider.stage}.AWS_PROFILE}",
    region: "ap-northeast-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      ENV: "${self:custom.environment.${self:provider.stage}.ENV}",
    },
  },
  useDotenv: true,
  // import the function via paths
  functions: { store },
  package: { individually: true },
  custom: {
    defaultStage: "dev",
    environment: {
      dev: "${file(./env/dev.yml)}",
      prod: "${file(./env/prod.yml)}",
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
