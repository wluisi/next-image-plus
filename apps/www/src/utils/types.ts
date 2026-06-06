// Content tree types
export interface ContentTreeEntry {
  id: string;
  title: string;
  path: string;
  url: string;
  parent: string;
  items?: ContentTreeEntry[];
}

export interface ContentTree {
  id: string;
  title: string;
  items: ContentTreeEntry[];
}

// Query types
export interface QueryFilter {
  [fieldName: string]: QueryFilterOperator | QueryFilterConjunction[];
}

export type QueryFilterOperator =
  | { _eq: string | number | boolean }
  | { _neq: string | number | boolean }
  | { _gt: string | number }
  | { _lt: string | number }
  | { _gte: string | number }
  | { _lte: string | number }
  | { _sw: string }
  | { _ew: string }
  | { _like: string }
  | { _in: string[] | number[] }
  | { _all_in: string[] | number[] }
  | { _nin: string[] | number[] }
  | { _btw: string[] | number[] }
  | { _nbtw: string[] | number[] }
  | { _null: boolean }
  | { _not_null: boolean };

export type QueryFilterConjunction =
  | { _and: QueryFilter[] }
  | { _or: QueryFilter[] };

export interface Sort {
  field: string;
  direction: "ASC" | "DESC";
}
