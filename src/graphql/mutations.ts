/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createMessage = /* GraphQL */ `mutation CreateMessage($input: MessageInput!) {
  createMessage(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateMessageMutationVariables,
  APITypes.CreateMessageMutation
>;
export const updateMessage = /* GraphQL */ `mutation UpdateMessage($input: MessageInput!) {
  updateMessage(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateMessageMutationVariables,
  APITypes.UpdateMessageMutation
>;
export const createRoom = /* GraphQL */ `mutation CreateRoom($input: RoomInput!) {
  createRoom(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateRoomMutationVariables,
  APITypes.CreateRoomMutation
>;
