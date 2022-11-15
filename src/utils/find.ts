import { parse } from './parse';
import type { CQCode, FindProps } from '../index';

const regExpStr = '\\[CQ:(.+?)\\]';

/**
 * @param { string } text 即将被寻找CQCode的字符串。
 * @param { FindProps } props 传入函数的参数。
 * @return { CQCode[] } 返回寻找到的CQCode对象列表。
 */
export const find = (text: string, props?: FindProps): CQCode[] => {
  const { type, ignoreError } = props || {};
  const matchedArr = text.match(new RegExp(regExpStr, 'ig'));
  const cqCodeArr: CQCode[] = [];
  matchedArr?.forEach((v) => {
    try {
      cqCodeArr.push(parse(v));
    } catch (err) {
      if (!ignoreError) {
        throw err;
      }
    }
  });
  if (type) {
    if (typeof type === 'string') {
      return cqCodeArr.filter((v) => v.type === type);
    } else {
      return cqCodeArr.filter((v) => type.includes(v.type));
    }
  } else {
    return cqCodeArr;
  }
};
