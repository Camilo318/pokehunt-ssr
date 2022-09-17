import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** ISO8601 Date values */
  Date: any;
  /** A Float or a String */
  GraphQLStringOrFloat: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Query = {
  __typename?: 'Query';
  pokemon: Array<Pokemon>;
  pokemon_aggregated: Array<Pokemon_Aggregated>;
  pokemon_by_id?: Maybe<Pokemon>;
};


export type QueryPokemonArgs = {
  filter?: InputMaybe<Pokemon_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPokemon_AggregatedArgs = {
  filter?: InputMaybe<Pokemon_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPokemon_By_IdArgs = {
  id: Scalars['ID'];
};

export type Count_Function_Filter_Operators = {
  count?: InputMaybe<Number_Filter_Operators>;
};

export type Count_Functions = {
  __typename?: 'count_functions';
  count?: Maybe<Scalars['Int']>;
};

export type Date_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _neq?: InputMaybe<Scalars['String']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Datetime_Function_Filter_Operators = {
  day?: InputMaybe<Number_Filter_Operators>;
  hour?: InputMaybe<Number_Filter_Operators>;
  minute?: InputMaybe<Number_Filter_Operators>;
  month?: InputMaybe<Number_Filter_Operators>;
  second?: InputMaybe<Number_Filter_Operators>;
  week?: InputMaybe<Number_Filter_Operators>;
  weekday?: InputMaybe<Number_Filter_Operators>;
  year?: InputMaybe<Number_Filter_Operators>;
};

export type Datetime_Functions = {
  __typename?: 'datetime_functions';
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  week?: Maybe<Scalars['Int']>;
  weekday?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type Directus_Files = {
  __typename?: 'directus_files';
  charset?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  embed?: Maybe<Scalars['String']>;
  filename_disk?: Maybe<Scalars['String']>;
  filename_download: Scalars['String'];
  filesize?: Maybe<Scalars['String']>;
  folder?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  location?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  metadata_func?: Maybe<Count_Functions>;
  modified_by?: Maybe<Scalars['String']>;
  modified_on: Scalars['Date'];
  modified_on_func?: Maybe<Datetime_Functions>;
  storage: Scalars['String'];
  tags?: Maybe<Scalars['JSON']>;
  tags_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uploaded_by?: Maybe<Scalars['String']>;
  uploaded_on: Scalars['Date'];
  uploaded_on_func?: Maybe<Datetime_Functions>;
  width?: Maybe<Scalars['Int']>;
};

export type Directus_Files_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  charset?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  duration?: InputMaybe<Number_Filter_Operators>;
  embed?: InputMaybe<String_Filter_Operators>;
  filename_disk?: InputMaybe<String_Filter_Operators>;
  filename_download?: InputMaybe<String_Filter_Operators>;
  filesize?: InputMaybe<String_Filter_Operators>;
  folder?: InputMaybe<String_Filter_Operators>;
  height?: InputMaybe<Number_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  metadata?: InputMaybe<String_Filter_Operators>;
  metadata_func?: InputMaybe<Count_Function_Filter_Operators>;
  modified_by?: InputMaybe<String_Filter_Operators>;
  modified_on?: InputMaybe<Date_Filter_Operators>;
  modified_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  storage?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  uploaded_by?: InputMaybe<String_Filter_Operators>;
  uploaded_on?: InputMaybe<Date_Filter_Operators>;
  uploaded_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Number_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _eq?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _gt?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _gte?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _lt?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _lte?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _neq?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Pokemon = {
  __typename?: 'pokemon';
  attack?: Maybe<Scalars['Int']>;
  defense?: Maybe<Scalars['Int']>;
  hp?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Directus_Files>;
  name?: Maybe<Scalars['String']>;
  special_attack?: Maybe<Scalars['Int']>;
  special_defense?: Maybe<Scalars['Int']>;
  speed?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['JSON']>;
  type_func?: Maybe<Count_Functions>;
};


export type PokemonImageArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Pokemon_Aggregated = {
  __typename?: 'pokemon_aggregated';
  avg?: Maybe<Pokemon_Aggregated_Fields>;
  avgDistinct?: Maybe<Pokemon_Aggregated_Fields>;
  count?: Maybe<Pokemon_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Pokemon_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Pokemon_Aggregated_Fields>;
  min?: Maybe<Pokemon_Aggregated_Fields>;
  sum?: Maybe<Pokemon_Aggregated_Fields>;
  sumDistinct?: Maybe<Pokemon_Aggregated_Fields>;
};

export type Pokemon_Aggregated_Count = {
  __typename?: 'pokemon_aggregated_count';
  attack?: Maybe<Scalars['Int']>;
  defense?: Maybe<Scalars['Int']>;
  hp?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  special_attack?: Maybe<Scalars['Int']>;
  special_defense?: Maybe<Scalars['Int']>;
  speed?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

export type Pokemon_Aggregated_Fields = {
  __typename?: 'pokemon_aggregated_fields';
  attack?: Maybe<Scalars['Float']>;
  defense?: Maybe<Scalars['Float']>;
  hp?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  special_attack?: Maybe<Scalars['Float']>;
  special_defense?: Maybe<Scalars['Float']>;
  speed?: Maybe<Scalars['Float']>;
};

export type Pokemon_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Pokemon_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Pokemon_Filter>>>;
  attack?: InputMaybe<Number_Filter_Operators>;
  defense?: InputMaybe<Number_Filter_Operators>;
  hp?: InputMaybe<Number_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  image?: InputMaybe<Directus_Files_Filter>;
  name?: InputMaybe<String_Filter_Operators>;
  special_attack?: InputMaybe<Number_Filter_Operators>;
  special_defense?: InputMaybe<Number_Filter_Operators>;
  speed?: InputMaybe<Number_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  type_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type String_Filter_Operators = {
  _contains?: InputMaybe<Scalars['String']>;
  _empty?: InputMaybe<Scalars['Boolean']>;
  _ends_with?: InputMaybe<Scalars['String']>;
  _eq?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _ncontains?: InputMaybe<Scalars['String']>;
  _nempty?: InputMaybe<Scalars['Boolean']>;
  _nends_with?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _nstarts_with?: InputMaybe<Scalars['String']>;
  _null?: InputMaybe<Scalars['Boolean']>;
  _starts_with?: InputMaybe<Scalars['String']>;
};

export type GetPokemonsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetPokemonsQuery = { __typename?: 'Query', pokemon: Array<{ __typename?: 'pokemon', id?: string | null, name?: string | null, hp?: number | null, attack?: number | null, defense?: number | null, image?: { __typename?: 'directus_files', id?: string | null } | null }> };


export const GetPokemonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPokemons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pokemon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hp"}},{"kind":"Field","name":{"kind":"Name","value":"attack"}},{"kind":"Field","name":{"kind":"Name","value":"defense"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetPokemonsQuery, GetPokemonsQueryVariables>;