/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type MessageInput = {
  content: MessageContentInput,
  roomId: string,
  id?: string | null,
};

export type MessageContentInput = {
  text?: string | null,
  imageId?: string | null,
};

export type Message = {
  __typename: "Message",
  id: string,
  content: MessageContent,
  owner: string,
  createdAt: string,
  updatedAt: string,
  roomId: string,
};

export type MessageContent = {
  __typename: "MessageContent",
  text?: string | null,
  imageId?: string | null,
};

export type RoomInput = {
  name: string,
};

export type Room = {
  __typename: "Room",
  id: string,
  name: string,
  messages?: MessageConnection | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type MessageConnection = {
  __typename: "MessageConnection",
  items?:  Array<Message > | null,
  nextToken?: string | null,
};

export type RoomConnection = {
  __typename: "RoomConnection",
  items?:  Array<Room > | null,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateMessageMutationVariables = {
  input: MessageInput,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    id: string,
    content:  {
      __typename: "MessageContent",
      text?: string | null,
      imageId?: string | null,
    },
    owner: string,
    createdAt: string,
    updatedAt: string,
    roomId: string,
  } | null,
};

export type UpdateMessageMutationVariables = {
  input: MessageInput,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    id: string,
    content:  {
      __typename: "MessageContent",
      text?: string | null,
      imageId?: string | null,
    },
    owner: string,
    createdAt: string,
    updatedAt: string,
    roomId: string,
  } | null,
};

export type CreateRoomMutationVariables = {
  input: RoomInput,
};

export type CreateRoomMutation = {
  createRoom?:  {
    __typename: "Room",
    id: string,
    name: string,
    messages?:  {
      __typename: "MessageConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type ListRoomsQueryVariables = {
  limit?: number | null,
};

export type ListRoomsQuery = {
  listRooms?:  {
    __typename: "RoomConnection",
    items?:  Array< {
      __typename: "Room",
      id: string,
      name: string,
      createdAt?: string | null,
      updatedAt?: string | null,
    } > | null,
    nextToken?: string | null,
  } | null,
};

export type ListMessagesForRoomQueryVariables = {
  roomId: string,
  sortDirection?: ModelSortDirection | null,
};

export type ListMessagesForRoomQuery = {
  listMessagesForRoom?:  {
    __typename: "MessageConnection",
    items?:  Array< {
      __typename: "Message",
      id: string,
      owner: string,
      createdAt: string,
      updatedAt: string,
      roomId: string,
    } > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateRoomSubscriptionVariables = {
};

export type OnCreateRoomSubscription = {
  onCreateRoom?:  {
    __typename: "Room",
    id: string,
    name: string,
    messages?:  {
      __typename: "MessageConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateMessageByRoomIdSubscriptionVariables = {
  roomId?: string | null,
};

export type OnCreateMessageByRoomIdSubscription = {
  onCreateMessageByRoomId?:  {
    __typename: "Message",
    id: string,
    content:  {
      __typename: "MessageContent",
      text?: string | null,
      imageId?: string | null,
    },
    owner: string,
    createdAt: string,
    updatedAt: string,
    roomId: string,
  } | null,
};

export type OnUpdateMessageSubscriptionVariables = {
  roomId?: string | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    id: string,
    content:  {
      __typename: "MessageContent",
      text?: string | null,
      imageId?: string | null,
    },
    owner: string,
    createdAt: string,
    updatedAt: string,
    roomId: string,
  } | null,
};
