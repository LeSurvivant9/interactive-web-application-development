import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
};

export type IAddCommentInput = {
  containsSpoiler?: Scalars["Boolean"]["input"];
  content: Scalars["String"]["input"];
  tvdbId: Scalars["String"]["input"];
  type: IMediaType;
};

export type IAddToCollectionInput = {
  status: IWatchStatus;
  tvdbId: Scalars["String"]["input"];
  type: IMediaType;
};

export type IAuthPayload = {
  __typename: "AuthPayload";
  accessToken: Scalars["String"]["output"];
  user: IUser;
};

export type IComment = {
  __typename: "Comment";
  containsSpoiler: Scalars["Boolean"]["output"];
  content: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  postedAt: Scalars["DateTime"]["output"];
  user: IUser;
};

export type ICreateUserInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type ILoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type IMedia = {
  __typename: "Media";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  originalTitle: Maybe<Scalars["String"]["output"]>;
  posterPath: Maybe<Scalars["String"]["output"]>;
  releaseDate: Maybe<Scalars["DateTime"]["output"]>;
  status: Maybe<Scalars["String"]["output"]>;
  syncStatus: ISyncStatus;
  synopsis: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  tvdbId: Scalars["String"]["output"];
  type: IMediaType;
};

export enum IMediaType {
  Movie = "MOVIE",
  Series = "SERIES",
}

export type IMutation = {
  __typename: "Mutation";
  addComment: IComment;
  addToCollection: IUserMedia;
  createUser: IUser;
  login: IAuthPayload;
  rateMedia: IUserMedia;
  removeComment: IComment;
  removeFromCollection: IUserMedia;
  removeUser: IUser;
  updateComment: IComment;
  updateUser: IUser;
};

export type IMutationAddCommentArgs = {
  input: IAddCommentInput;
};

export type IMutationAddToCollectionArgs = {
  input: IAddToCollectionInput;
};

export type IMutationCreateUserArgs = {
  createUserInput: ICreateUserInput;
};

export type IMutationLoginArgs = {
  loginInput: ILoginInput;
};

export type IMutationRateMediaArgs = {
  rating: Scalars["Int"]["input"];
  tvdbId: Scalars["String"]["input"];
};

export type IMutationRemoveCommentArgs = {
  commentId: Scalars["Int"]["input"];
};

export type IMutationRemoveFromCollectionArgs = {
  tvdbId: Scalars["String"]["input"];
};

export type IMutationRemoveUserArgs = {
  id: Scalars["ID"]["input"];
};

export type IMutationUpdateCommentArgs = {
  commentId: Scalars["Int"]["input"];
  containsSpoiler: Scalars["Boolean"]["input"];
  content: Scalars["String"]["input"];
};

export type IMutationUpdateUserArgs = {
  updateUserInput: IUpdateUserInput;
};

export type IQuery = {
  __typename: "Query";
  collectionEntry: Maybe<IUserMedia>;
  me: IUser;
  mediaComments: Array<IComment>;
  mediaDetails: ITvdbMediaDetails;
  popularMovies: Array<ITvdbSearchResult>;
  popularSeries: Array<ITvdbSearchResult>;
  searchMedia: Array<ITvdbSearchResult>;
  user: Maybe<IUser>;
  users: Array<IUser>;
};

export type IQueryCollectionEntryArgs = {
  tvdbId: Scalars["String"]["input"];
};

export type IQueryMediaCommentsArgs = {
  tvdbId: Scalars["String"]["input"];
};

export type IQueryMediaDetailsArgs = {
  tvdbId: Scalars["String"]["input"];
  type: IMediaType;
};

export type IQuerySearchMediaArgs = {
  query: Scalars["String"]["input"];
};

export type IQueryUserArgs = {
  id: Scalars["ID"]["input"];
};

export enum IRole {
  Admin = "ADMIN",
  User = "USER",
}

export enum ISyncStatus {
  Error = "ERROR",
  Processing = "PROCESSING",
  Ready = "READY",
}

export type ITvdbGenre = {
  __typename: "TvdbGenre";
  id: Scalars["Float"]["output"];
  name: Scalars["String"]["output"];
};

export type ITvdbMediaDetails = {
  __typename: "TvdbMediaDetails";
  banner_url: Maybe<Scalars["String"]["output"]>;
  genres: Maybe<Array<ITvdbGenre>>;
  image_url: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  original_name: Maybe<Scalars["String"]["output"]>;
  overview: Maybe<Scalars["String"]["output"]>;
  release_date: Maybe<Scalars["DateTime"]["output"]>;
  runtime: Maybe<Scalars["Int"]["output"]>;
  status: Maybe<Scalars["String"]["output"]>;
  tvdb_id: Scalars["String"]["output"];
  type: IMediaType;
  year: Maybe<Scalars["String"]["output"]>;
};

export type ITvdbSearchResult = {
  __typename: "TvdbSearchResult";
  image_url: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  overview: Maybe<Scalars["String"]["output"]>;
  tvdb_id: Maybe<Scalars["ID"]["output"]>;
  type: Maybe<Scalars["String"]["output"]>;
  year: Maybe<Scalars["String"]["output"]>;
};

export type IUpdateUserInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type IUser = {
  __typename: "User";
  avatarUrl: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  role: IRole;
  updatedAt: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
};

export type IUserMedia = {
  __typename: "UserMedia";
  addedAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  media: IMedia;
  rating: Maybe<Scalars["Int"]["output"]>;
  status: IWatchStatus;
};

export enum IWatchStatus {
  Completed = "COMPLETED",
  Dropped = "DROPPED",
  OnHold = "ON_HOLD",
  PlanToWatch = "PLAN_TO_WATCH",
  Watching = "WATCHING",
}

export type IMeQueryVariables = Exact<{ [key: string]: never }>;

export type IMeQuery = {
  me: {
    __typename: "User";
    id: string;
    username: string;
    email: string;
    role: IRole;
    createdAt: string;
  };
};

export type IRegisterMutationVariables = Exact<{
  input: ICreateUserInput;
}>;

export type IRegisterMutation = {
  createUser: {
    __typename: "User";
    id: string;
    email: string;
    username: string;
  };
};

export type ILoginMutationVariables = Exact<{
  loginInput: ILoginInput;
}>;

export type ILoginMutation = {
  login: {
    __typename: "AuthPayload";
    accessToken: string;
    user: {
      __typename: "User";
      id: string;
      email: string;
      username: string;
      role: IRole;
    };
  };
};

export type IAddToCollectionMutationVariables = Exact<{
  input: IAddToCollectionInput;
}>;

export type IAddToCollectionMutation = {
  addToCollection: {
    __typename: "UserMedia";
    id: string;
    status: IWatchStatus;
    media: { __typename: "Media"; id: number; title: string };
  };
};

export type IGetCollectionEntryQueryVariables = Exact<{
  tvdbId: Scalars["String"]["input"];
}>;

export type IGetCollectionEntryQuery = {
  collectionEntry: {
    __typename: "UserMedia";
    id: string;
    rating: number | null;
    status: IWatchStatus;
    addedAt: string;
  } | null;
};

export type IRateMediaMutationVariables = Exact<{
  tvdbId: Scalars["String"]["input"];
  rating: Scalars["Int"]["input"];
}>;

export type IRateMediaMutation = {
  rateMedia: {
    __typename: "UserMedia";
    id: string;
    rating: number | null;
    status: IWatchStatus;
  };
};

export type IRemoveFromCollectionMutationVariables = Exact<{
  tvdbId: Scalars["String"]["input"];
}>;

export type IRemoveFromCollectionMutation = {
  removeFromCollection: {
    __typename: "UserMedia";
    id: string;
    media: { __typename: "Media"; id: number; title: string };
  };
};

export type IGetMediaCommentsQueryVariables = Exact<{
  tvdbId: Scalars["String"]["input"];
}>;

export type IGetMediaCommentsQuery = {
  mediaComments: Array<{
    __typename: "Comment";
    id: number;
    content: string;
    containsSpoiler: boolean;
    postedAt: string;
    user: {
      __typename: "User";
      id: string;
      username: string;
      avatarUrl: string | null;
    };
  }>;
};

export type IAddCommentMutationVariables = Exact<{
  input: IAddCommentInput;
}>;

export type IAddCommentMutation = {
  addComment: {
    __typename: "Comment";
    id: number;
    content: string;
    postedAt: string;
    user: { __typename: "User"; username: string };
  };
};

export type IUpdateCommentMutationVariables = Exact<{
  commentId: Scalars["Int"]["input"];
  content: Scalars["String"]["input"];
  containsSpoiler: Scalars["Boolean"]["input"];
}>;

export type IUpdateCommentMutation = {
  updateComment: {
    __typename: "Comment";
    id: number;
    content: string;
    containsSpoiler: boolean;
  };
};

export type IRemoveCommentMutationVariables = Exact<{
  commentId: Scalars["Int"]["input"];
}>;

export type IRemoveCommentMutation = {
  removeComment: { __typename: "Comment"; id: number };
};

export type IGetMediaDetailsQueryVariables = Exact<{
  tvdbId: Scalars["String"]["input"];
  type: IMediaType;
}>;

export type IGetMediaDetailsQuery = {
  mediaDetails: {
    __typename: "TvdbMediaDetails";
    tvdb_id: string;
    name: string;
    original_name: string | null;
    overview: string | null;
    image_url: string | null;
    banner_url: string | null;
    year: string | null;
    release_date: string | null;
    status: string | null;
    runtime: number | null;
    genres: Array<{ __typename: "TvdbGenre"; name: string }> | null;
  };
};

export type ISearchQueryVariables = Exact<{
  query: Scalars["String"]["input"];
}>;

export type ISearchQuery = {
  searchMedia: Array<{
    __typename: "TvdbSearchResult";
    tvdb_id: string | null;
    name: string;
    image_url: string | null;
    overview: string | null;
    type: string | null;
    year: string | null;
  }>;
};

export type IGetDashboardDataQueryVariables = Exact<{ [key: string]: never }>;

export type IGetDashboardDataQuery = {
  popularMovies: Array<{
    __typename: "TvdbSearchResult";
    tvdb_id: string | null;
    name: string;
    image_url: string | null;
    type: string | null;
    year: string | null;
  }>;
  popularSeries: Array<{
    __typename: "TvdbSearchResult";
    tvdb_id: string | null;
    name: string;
    image_url: string | null;
    type: string | null;
    year: string | null;
  }>;
};

export type IGetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type IGetUsersQuery = {
  users: Array<{
    __typename: "User";
    id: string;
    username: string;
    email: string;
    role: IRole;
    createdAt: string;
  }>;
};

export type ICreateUserMutationVariables = Exact<{
  createUserInput: ICreateUserInput;
}>;

export type ICreateUserMutation = {
  createUser: { __typename: "User"; id: string; username: string; role: IRole };
};

export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<IMeQuery, IMeQueryVariables>;
export const RegisterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Register" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateUserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "createUserInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<IRegisterMutation, IRegisterMutationVariables>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "loginInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "LoginInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "loginInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "loginInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ILoginMutation, ILoginMutationVariables>;
export const AddToCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddToCollection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AddToCollectionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addToCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "media" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  IAddToCollectionMutation,
  IAddToCollectionMutationVariables
>;
export const GetCollectionEntryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCollectionEntry" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "tvdbId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "collectionEntry" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "tvdbId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "tvdbId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "addedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  IGetCollectionEntryQuery,
  IGetCollectionEntryQueryVariables
>;
export const RateMediaDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RateMedia" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "tvdbId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "rating" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "rateMedia" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "tvdbId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "tvdbId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "rating" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "rating" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<IRateMediaMutation, IRateMediaMutationVariables>;
export const RemoveFromCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveFromCollection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "tvdbId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeFromCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "tvdbId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "tvdbId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "media" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  IRemoveFromCollectionMutation,
  IRemoveFromCollectionMutationVariables
>;
export const GetMediaCommentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetMediaComments" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "tvdbId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "mediaComments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "tvdbId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "tvdbId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "containsSpoiler" },
                },
                { kind: "Field", name: { kind: "Name", value: "postedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "avatarUrl" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  IGetMediaCommentsQuery,
  IGetMediaCommentsQueryVariables
>;
export const AddCommentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddComment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AddCommentInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addComment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "postedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<IAddCommentMutation, IAddCommentMutationVariables>;
export const UpdateCommentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateComment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "commentId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "content" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "containsSpoiler" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateComment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "commentId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "commentId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "content" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "content" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "containsSpoiler" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "containsSpoiler" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "containsSpoiler" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  IUpdateCommentMutation,
  IUpdateCommentMutationVariables
>;
export const RemoveCommentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveComment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "commentId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeComment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "commentId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "commentId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  IRemoveCommentMutation,
  IRemoveCommentMutationVariables
>;
export const GetMediaDetailsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetMediaDetails" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "tvdbId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "MediaType" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "mediaDetails" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "tvdbId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "tvdbId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "type" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "tvdb_id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "original_name" },
                },
                { kind: "Field", name: { kind: "Name", value: "overview" } },
                { kind: "Field", name: { kind: "Name", value: "image_url" } },
                { kind: "Field", name: { kind: "Name", value: "banner_url" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "release_date" },
                },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "runtime" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "genres" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  IGetMediaDetailsQuery,
  IGetMediaDetailsQueryVariables
>;
export const SearchDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Search" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "query" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "searchMedia" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "query" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "query" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "tvdb_id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "image_url" } },
                { kind: "Field", name: { kind: "Name", value: "overview" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ISearchQuery, ISearchQueryVariables>;
export const GetDashboardDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetDashboardData" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "popularMovies" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "tvdb_id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "image_url" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "popularSeries" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "tvdb_id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "image_url" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  IGetDashboardDataQuery,
  IGetDashboardDataQueryVariables
>;
export const GetUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUsers" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<IGetUsersQuery, IGetUsersQueryVariables>;
export const CreateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "createUserInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateUserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "createUserInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "createUserInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ICreateUserMutation, ICreateUserMutationVariables>;
