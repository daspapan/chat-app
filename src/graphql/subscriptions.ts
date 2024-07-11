/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateRoom = /* GraphQL */ `subscription OnCreateRoom {
  onCreateRoom {
    id
    name
    messages {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateRoomSubscriptionVariables,
  APITypes.OnCreateRoomSubscription
>;
export const onCreateMessageByRoomId = /* GraphQL */ `subscription OnCreateMessageByRoomId($roomId: ID) {
  onCreateMessageByRoomId(roomId: $roomId) {
    id
    content {
      text
      imageId
      __typename
    }
    owner
    createdAt
    updatedAt
    roomId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMessageByRoomIdSubscriptionVariables,
  APITypes.OnCreateMessageByRoomIdSubscription
>;
export const onUpdateMessage = /* GraphQL */ `subscription OnUpdateMessage($roomId: ID) {
  onUpdateMessage(roomId: $roomId) {
    id
    content {
      text
      imageId
      __typename
    }
    owner
    createdAt
    updatedAt
    roomId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMessageSubscriptionVariables,
  APITypes.OnUpdateMessageSubscription
>;
