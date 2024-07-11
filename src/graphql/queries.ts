/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const listRooms = /* GraphQL */ `query ListRooms($limit: Int) {
  listRooms(limit: $limit) {
    items {
      id
      name
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListRoomsQueryVariables, APITypes.ListRoomsQuery>;
export const listMessagesForRoom = /* GraphQL */ `query ListMessagesForRoom($roomId: ID!, $sortDirection: ModelSortDirection) {
  listMessagesForRoom(roomId: $roomId, sortDirection: $sortDirection) {
    items {
      id
      owner
      createdAt
      updatedAt
      roomId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMessagesForRoomQueryVariables,
  APITypes.ListMessagesForRoomQuery
>;
