import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CDKContext } from '../cdk.context';
import { createAuth } from './auth/cognito';
import { createTables } from './tables/dynamodb';
import { createStorage } from './storage/bucket';
import { createAppSyncAPI } from './api/appsync';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps, context: CDKContext) {
    super(scope, id, props);

    const appNameWithStage = `${context.appName}-${context.stage}`;

    // DynamoDB Setup
    const DynamoDBTables = createTables(this, {appName: appNameWithStage});

    // Cognito Setup
    const auth = createAuth(this, {
      appName: appNameWithStage, 
      userTable: DynamoDBTables.userTable,
      hasCognitoGroups: true,
      groupNames: ['Admin', 'Management', 'Administrator', 'Principal', 'Operators', 'Teachers', 'Parents', 'Guests']
    });

    // Storage Setup
    const fileStorageBucket = createStorage(this, {
      appName: appNameWithStage,
      authenticatedRole: auth.identityPool.authenticatedRole,
	    unauthenticatedRole: auth.identityPool.unauthenticatedRole,
      allowedOrigins: ['http://localhost:3000'],
    });

    // AppSync GraphQL Setup
    const api = createAppSyncAPI(this, {
      appName: appNameWithStage,
      userPool: auth.userPool,
      roomTable: DynamoDBTables.roomTable,
      userTable: DynamoDBTables.userTable,
      messageTable: DynamoDBTables.messageTable,
      unauthenticatedRole: auth.identityPool.unauthenticatedRole
    });

    
    new cdk.CfnOutput(this, 'Region', {value: this.region})
    new cdk.CfnOutput(this, 'UserPoolId', {value: auth.userPool.userPoolId})
    new cdk.CfnOutput(this, 'UserPoolClientId', {value: auth.userPoolClient.userPoolClientId})
    new cdk.CfnOutput(this, 'IdentityPoolId', {value: auth.identityPool.identityPoolId})
    new cdk.CfnOutput(this, 'BucketName', {value: fileStorageBucket.bucketName})
    new cdk.CfnOutput(this, 'BucketRegion', {value: this.region})
    new cdk.CfnOutput(this, 'GraphQLAPIUrl', {value: api.graphqlUrl})
    new cdk.CfnOutput(this, 'GraphQLAPIId', {value: api.apiId})
    // new cdk.CfnOutput(this, 'AmplifyAppId', {value: amplifyHosting.appId})


  }
}
