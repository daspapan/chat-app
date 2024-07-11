import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, Billing, BillingMode, Table, TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { Effect, IRole, ManagedPolicy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket, HttpMethods } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs"

type BugketProps = {
    appName: string
    authenticatedRole: IRole
    unauthenticatedRole: IRole
    allowedOrigins: string[]
}

export function createStorage(scope: Construct, props: BugketProps){


    const fileStorageBucket = new Bucket(scope, `${props.appName}-bucket`, {
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        cors: [
            {
                allowedMethods: [
                    HttpMethods.GET,
                    HttpMethods.POST,
                    HttpMethods.PUT,
                    HttpMethods.DELETE,
                ],
                allowedOrigins: props.allowedOrigins,
                allowedHeaders: ['*'],
            },
        ],
    })

    const mangedPolicyForAmplifyUnauth = new ManagedPolicy(
        scope,
        `${props.appName}-mangedPolicyForAmplifyUnauth`,
        {
            description: `Managed policy for ${props.appName} to allow usage of Storage Library for unauth`,
            statements: [
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    actions: ['s3:GetObject'],
                    resources: [
                        `arn:aws:s3:::${fileStorageBucket.bucketName}/public/*`,
                    ],
                }),
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    actions: ['s3:GetObject'],
                    resources: [
                        `arn:aws:s3:::${fileStorageBucket.bucketName}/protected/*`,
                    ],
                }),
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    actions: ['s3:ListBucket'],
                    resources: [`arn:aws:s3:::${fileStorageBucket.bucketName}`],
                    conditions: {
                        StringLike: {
                            's3:prefix': [
                                'public/',
                                'public/*',
                                'protected/',
                                'protected/*',
                            ],
                        },
                    },
                }),
            ],
            roles: [props.unauthenticatedRole],
        }
    )


    const mangedPolicyForAmplifyAuth = new ManagedPolicy(
        scope,
        `${props.appName}-mangedPolicyForAmplifyAuth`,
        {
            description: `Managed Policy for ${props.appName} to allow usage of storage library for auth`,
            statements: [
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    actions: ['s3:PutObject', 's3:GetObject', 's3:DeleteObject'],
                    resources: [
                        `arn:aws:s3:::${fileStorageBucket.bucketName}/public/*`,
                    ],
                }),
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    actions: ['s3:PutObject', 's3:GetObject', 's3:DeleteObject'],
                    resources: [
                        `arn:aws:s3:::${fileStorageBucket.bucketName}/protected/\${cognito-identity.amazonaws.com:sub}/*`,
                    ],
                }),
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    actions: ['s3:PutObject', 's3:GetObject', 's3:DeleteObject'],
                    resources: [
                        `arn:aws:s3:::${fileStorageBucket.bucketName}/private/\${cognito-identity.amazonaws.com:sub}/*`,
                    ],
                }),
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    actions: ['s3:GetObject'],
                    resources: [
                        `arn:aws:s3:::${fileStorageBucket.bucketName}/protected/*`,
                    ],
                }),
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    actions: ['s3:ListBucket'],
                    resources: [`arn:aws:s3:::${fileStorageBucket.bucketName}`],
                    conditions: {
                        StringLike: {
                            's3:prefix': [
                                'public/',
                                'public/*',
                                'protected/',
                                'protected/*',
                                'private/${cognito-identity.amazonaws.com:sub}/',
                                'private/${cognito-identity.amazonaws.com:sub}/*',
                            ],
                        },
                    },
                }),
            ],
            roles: [props.authenticatedRole],
        }
    )
    

    return fileStorageBucket;
}