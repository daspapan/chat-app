import { Construct } from 'constructs'
import * as path from 'path'
import {
	AuthorizationType,
	Definition,
	GraphqlApi,
	FieldLogLevel,
	FunctionRuntime,
	Code,
	MappingTemplate,
} from 'aws-cdk-lib/aws-appsync'
import { IRole } from 'aws-cdk-lib/aws-iam'
import { UserPool } from 'aws-cdk-lib/aws-cognito'
import { Table } from 'aws-cdk-lib/aws-dynamodb'

type AppSyncAPIProps = {
	appName: string
	userPool: UserPool
	roomTable: Table
	userTable: Table
	messageTable: Table
	unauthenticatedRole: IRole
}

export const createAppSyncAPI = (scope: Construct, props: AppSyncAPIProps) => {

	const api = new GraphqlApi(scope, `${props.appName}`, {
		name: props.appName,
		definition: Definition.fromFile(path.join(__dirname, 'graphql/schema.graphql')),
		authorizationConfig: {
			defaultAuthorization: {
				authorizationType: AuthorizationType.USER_POOL,
				userPoolConfig: {
					userPool: props.userPool,
				},
			},
		},
		logConfig: {
			fieldLogLevel: FieldLogLevel.ALL,
		},
		xrayEnabled: true,
	})

	const roomTableDS = api.addDynamoDbDataSource('RoomTableDS', props.roomTable)
	const messageTableDS = api.addDynamoDbDataSource('MessageTableDS', props.messageTable)

	roomTableDS.createResolver('createRoomResolver', {
		typeName: 'Mutation', 
		fieldName: 'createRoom',
		requestMappingTemplate: MappingTemplate.fromFile(
			path.join(
				__dirname,
				'graphql/mapping/Mutation.createRoom.req.vtl'
			)
		),
		responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
	})

	roomTableDS.createResolver('listRoomsResolver', {
		typeName: 'Query',
		fieldName: 'listRooms',
		// Can't use MappingTemplate.dynamoDbScanTable() because it's too basic for our needs👇🏽
		// https://github.com/aws/aws-cdk/blob/5e4d48e2ff12a86c0fb0177fe7080990cf79dbd0/packages/%40aws-cdk/aws-appsync/lib/mapping-template.ts#L39. I should PR this to take in an optional limit and scan 🤔
		requestMappingTemplate: MappingTemplate.fromFile(
			path.join(__dirname, 'graphql/mapping/Query.listRooms.req.vtl')
		),
		responseMappingTemplate: MappingTemplate.fromFile(
			path.join(__dirname, 'graphql/mapping/Query.listRooms.res.vtl')
		),
	})

	messageTableDS.createResolver('createMessageResolver', {
		typeName: 'Mutation',
		fieldName: 'createMessage',
		requestMappingTemplate: MappingTemplate.fromFile(
			path.join(
				__dirname,
				'graphql/mapping/Mutation.createMessage.req.vtl'
			)
		),
		responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
	})
	messageTableDS.createResolver('listMessagesForRoomResolver', {
		typeName: 'Query',
		fieldName: 'listMessagesForRoom',
		requestMappingTemplate: MappingTemplate.fromFile(
			path.join(
				__dirname,
				'graphql/mapping/Query.listMessagesForRoom.req.vtl'
			)
		),
		responseMappingTemplate: MappingTemplate.fromFile(
			path.join(
				__dirname,
				'graphql/mapping/Query.listMessagesForRoom.res.vtl'
			)
		),
	})

	messageTableDS.createResolver('updateMessageResolver', {
		typeName: 'Mutation',
		fieldName: 'updateMessage',
		requestMappingTemplate: MappingTemplate.fromFile(
			path.join(
				__dirname,
				'graphql/mapping/Mutation.updateMessage.req.vtl'
			)
		),
		responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
	})

	return api
}
