export * from './utils/parse';
export * from './utils/serialize';
export * from './utils/find';
export * from './utils/split';

export interface CQCode {
  type: string;
  data: {
    [key: string]: any;
  };
}

export interface FindProps {
  type?: string | string[];
  ignoreError?: boolean;
}

export interface SplitProps {
  type?: string | string[];
}
