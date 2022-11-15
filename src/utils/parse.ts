import type { CQCode } from '../index';

/**
 * @param { string } text 即将被解析的CQCode字符串，以[开始，以]结束。
 * @return { CQCode } 返回CQCode对象。
 */
export const parse = (text: string): CQCode => {
  if (text.substring(0, 1) !== '[' || text.substring(text.length - 1) !== ']') {
    throw new Error('Not a valid CQCode string.');
  }
  const splitArr = text.substring(1, text.length - 1).split(',');
  if (splitArr.length < 1) {
    throw new Error('Could not find CQ:{type} field.');
  }
  const cqCodeTypeArr = splitArr[0].split(':');
  if (cqCodeTypeArr[0] !== 'CQ') {
    throw new Error('Could not find CQ:{type} field.');
  }
  const cqCodeType = cqCodeTypeArr[1].toLowerCase();
  const cqCodeData: any = {};
  for (let i = 1; i < splitArr.length; i++) {
    const cqCodeDataArr = splitArr[i].split('=');
    if (cqCodeDataArr.length > 1) {
      cqCodeData[cqCodeDataArr[0]] = cqCodeDataArr[1];
    }
  }
  return {
    type: cqCodeType,
    data: cqCodeData,
  };
};
