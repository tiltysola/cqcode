const { serialize } = require('../');

const cqCode1 = {
  type: 'at',
  data: {
    qq: '100000',
  },
};
const cqCode2 = {
  type: 'at',
};
const cqCode3 = {
  type: 'at',
  data: null,
};

const cqCode4 = {
  type: 'at',
  data: {
    rankC: 'No.1',
    rankA: 'No.2',
    rankB: 'No.3',
  },
};

test('Serialize cqCode1.', () => {
  expect(serialize(cqCode1)).toBe('[CQ:at,qq=100000]');
});

test('Serialize cqCode2.', () => {
  expect(serialize(cqCode2)).toBe('[CQ:at]');
});

test('Serialize cqCode3.', () => {
  expect(serialize(cqCode3)).toBe('[CQ:at]');
});

test('Serialize cqCode4.', () => {
  expect(serialize(cqCode4)).toBe('[CQ:at,rankC=No.1,rankA=No.2,rankB=No.3]');
});
