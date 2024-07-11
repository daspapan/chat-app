import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, Billing, BillingMode, Table, TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { Effect, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs"

type TablesProps = {
    appName: string
}

export function createTables(scope: Construct, props: TablesProps){

    const userTable = new Table(scope, `${props.appName}-UserTable`, {
        removalPolicy: RemovalPolicy.DESTROY,
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: { name: 'id', type: AttributeType.STRING },
    })

    const roomTable = new Table(scope, `${props.appName}-RoomTable`, {
        removalPolicy: RemovalPolicy.DESTROY,
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: { name: 'id', type: AttributeType.STRING },
    })

    const messageTable = new Table(scope, `${props.appName}-MessageTable`, {
        removalPolicy: RemovalPolicy.DESTROY,
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: { name: 'id', type: AttributeType.STRING },
    })

    messageTable.addGlobalSecondaryIndex({
        indexName: 'messages-by-room-id',
        partitionKey: { name: 'roomId', type: AttributeType.STRING },
        sortKey: { name: 'createdAt', type: AttributeType.STRING },
    })

    const messageTableServiceRole = new Role(scope, `${props.appName}-MessageTableServiceRole`, {
        assumedBy: new ServicePrincipal('dynamodb.amazonaws.com'),
    })

    messageTableServiceRole.addToPolicy(
        new PolicyStatement({
            effect: Effect.ALLOW,
            resources: [`${messageTable.tableArn}/index/messages-by-room-id`],
            actions: ['dymamodb:Query'],
        })
    )

    

    return {roomTable, userTable, messageTable}
}