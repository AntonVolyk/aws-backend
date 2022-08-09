import type { AWS } from '@serverless/typescript';
import { environment } from './environment';
import getProductsList from '@functions/get-products-list';
import getProductsById from '@functions/get-products-by-id';
import createProduct from '@functions/create-product';
import initDB from '@functions/pg-client';
import catalogBatchProcess from "@functions/catalog-batch-process";

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
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: 'sns:*',
            Resource: ['arn:aws:sns:eu-west-1:978255579526:create-product-topic']
          }]
      }
    },
    environment: {
      SNS_ARN: {
        Ref: 'SNSTopic'
      },
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      ...environment
    },
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalog-items-queue'
        }
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'create-product-topic'
        }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'volik.anton@gmail.com',
          Protocol: 'email',
          TopicArn: 'arn:aws:sns:eu-west-1:978255579526:create-product-topic'
        }
      }
    }
  },
  functions: {
    initDB,
    getProductsList,
    getProductsById,
    createProduct,
    catalogBatchProcess
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
