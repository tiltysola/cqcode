import type { CQCode } from '../index';

/**
 * @param { CQCode } cqCode 即将被序列化的CQCode对象。
 * @return { string } 返回CQCode字符串。
 */
export const serialize = (cqCode: CQCode): string => {
  const cqCodeTypeStr = `CQ:${cqCode.type}`;
  const cqCodeDataStrArr = Object.keys(cqCode.data || {}).map((key) => {
    return `${key}=${cqCode.data[key]}`;
  });
  return `[${cqCodeTypeStr},${cqCodeDataStrArr.join(',')}]`;
};
