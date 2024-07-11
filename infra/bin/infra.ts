#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';
import * as gitBranch from 'git-branch';
import { CDKContext } from '../cdk.context';

const app = new cdk.App();

const currentBranch = process.env.AWS_BRANCH || gitBranch.sync();
const globals = app.node.tryGetContext('globals') || {}
const branchConfig = app.node.tryGetContext(currentBranch);
if(!branchConfig){
  throw new Error(`No configuration found for branch: ${currentBranch}`)
}

const context: CDKContext & cdk.StackProps = {
  branch: currentBranch,
  ...globals,
  ...branchConfig
}
console.log("Context", context)

const appName = `${context.appName}-${context.stage}`
const stackName = `${appName}-Stack`

new InfraStack(
  app, 
  stackName, 
  {
    stackName,
    env: context.env
  }, 
  context
);