import * as cognito from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import { IdentityPool, UserPoolAuthenticationProvider } from '@aws-cdk/aws-cognito-identitypool-alpha';
import { RemovalPolicy } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { Table } from "aws-cdk-lib/aws-dynamodb";

type CreateAuthProps = {
    appName: string
    userTable: Table
    hasCognitoGroups: boolean
    groupNames?: string[]
}

export function createAuth(scope: Construct, props: CreateAuthProps){

    const addUserFunc = new Function(scope, `${props.appName}-postConfirmTriggerFunc`, {
        runtime: Runtime.NODEJS_16_X,
        handler: 'addUserToDB.main',
        code: Code.fromAsset(
            path.join(__dirname, '../functions/postConfirmTrigger')
        ),
        environment: {
            TABLENAME: props.userTable.tableName,
        },
    })

     
    const userPool = new cognito.UserPool(scope, `${props.appName}-userpool`, {
        userPoolName: `${props.appName}-userpool`,
        selfSignUpEnabled: true,
        accountRecovery: cognito.AccountRecovery.PHONE_AND_EMAIL,
        userVerification: {
            emailStyle: cognito.VerificationEmailStyle.CODE,
        },
        autoVerify: {
            email: true,
        },
        standardAttributes: {
            email: {
                required: true,
                mutable: true,
            },
            givenName: {
                required: true,
                mutable: true,
            },
            familyName: {
                required: true,
                mutable: true
            }
        },
        removalPolicy: RemovalPolicy.DESTROY,
        lambdaTriggers: {
            postConfirmation: addUserFunc,
        },
    })

    props.userTable.grantWriteData(addUserFunc);

    if(props.hasCognitoGroups){
        props.groupNames?.forEach(
            (groupName) => new cognito.CfnUserPoolGroup(scope, `${props.appName}-${groupName}Group`, {
                userPoolId: userPool.userPoolId,
                groupName: groupName,
                description: `This is ${groupName} group.`
            })
        )
    }

    const userPoolClient = new cognito.UserPoolClient(scope, `${props.appName}-userpoolClient`, {
        userPool
    })

    const identityPool = new IdentityPool(
        scope,
        `${props.appName}-identityPool`,
        {
            identityPoolName:  `${props.appName}-identityPool`,
            allowUnauthenticatedIdentities: true,
            authenticationProviders: {
                userPools: [
                    new UserPoolAuthenticationProvider({
                        userPool: userPool,
                        userPoolClient: userPoolClient
                    })
                ]
            },
            
        }
    )

    return { userPool, userPoolClient, identityPool}
}