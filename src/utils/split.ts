import { parse } from './parse';
import type { CQCode, SplitProps } from '../index';

/**
 * @param { string } text 即将被寻找CQCode的字符串。
 * @param { SplitProps } props 传入函数的参数。
 * @return { CQCode[] } 返回寻找到的CQCode对象列表。
 */
export const split = (text: string, props: SplitProps): any => {
  const { type } = props || {};
  const splitRightBracketArr = text.split(']');
  const splitLeftBracketArr = splitRightBracketArr.map((v, i) => {
    if (i < splitRightBracketArr.length - 1) {
      return `${v}]`;
    } else {
      return v;
    }
  }).filter((v) => v !== '').map((v) => {
    return v.split('[');
  });
  const splitBracketArr: string[] = [];
  splitLeftBracketArr.forEach((v) => {
    return v.forEach((vv, i) => {
      if (i > 0) {
        splitBracketArr.push(`[${vv}`);
      } else {
        splitBracketArr.push(vv);
      }
    });
  });
  const cqCodeArr: CQCode[] = [];
  splitBracketArr.filter((v) => v !== '').forEach((v) => {
    try {
      cqCodeArr.push(parse(v));
    } catch (err) {
      cqCodeArr.push({
        type: 'plain',
        data: {
          text: v,
        },
      });
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
