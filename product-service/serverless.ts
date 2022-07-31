import type { AWS } from '@serverless/typescript';
import getProductsList from '@functions/get-products-list';
import getProductsById from '@functions/get-products-by-id';
import createProduct from '@functions/create-product';
import initDB from '@functions/pg-client';
import { environment } from './environment';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: [
    'serverless-auto-swagger',
    'serverless-esbuild',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      ...environment
    },
  },
  functions: {
    initDB,
    getProductsList,
    getProductsById,
    createProduct
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10
    },
    autoswagger: {
      host: 'cu49vrzbw3.execute-api.eu-west-1.amazonaws.com/dev'
    }
  },
};

module.exports = serverlessConfiguration;
