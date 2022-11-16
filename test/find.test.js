const { find } = require('../');

const string1 = 'This is a long message.';
const string2 = '[CQ:at,qq=100000]';
const string3 = 'This is a [CQ:at,qq=100000] long message.';
const string4 = 'This is a [CQ:at,qq=100000] long message. This is the second [CQ:quote,qq=100000] long message.';
const string5 = '[CQ::at,qq=100000]';

test('Find string1.', () => {
  expect(find(string1)).toStrictEqual([]);
});

test('Find string2.', () => {
  expect(find(string2)).toStrictEqual([{
    type: 'at',
    data: {
      qq: '100000',
    },
  }]);
});

test('Find string2, type="at".', () => {
  expect(find(string2, { type: 'at' })).toStrictEqual([{
    type: 'at',
    data: {
      qq: '100000',
    },
  }]);
});

test('Find string2, type=["at"].', () => {
  expect(find(string2, { type: ['at'] })).toStrictEqual([{
    type: 'at',
    data: {
      qq: '100000',
    },
  }]);
});

test('Find string2, type="never".', () => {
  expect(find(string2, { type: 'never' })).toStrictEqual([]);
});

test('Find string3.', () => {
  expect(find(string3)).toStrictEqual([{
    type: 'at',
    data: {
      qq: '100000',
    },
  }]);
});

test('Find string4.', () => {
  expect(find(string4)).toStrictEqual([{
    type: 'at',
    data: {
      qq: '100000',
    },
  }, {
    type: 'quote',
    data: {
      qq: '100000',
    },
  }]);
});

test('Find string4, type="at".', () => {
  expect(find(string4, { type: 'at' })).toStrictEqual([{
    type: 'at',
    data: {
      qq: '100000',
    },
  }]);
});

test('Find string4, type=["at", "quote"].', () => {
  expect(find(string4, { type: ['at', 'quote'] })).toStrictEqual([{
    type: 'at',
    data: {
      qq: '100000',
    },
  }, {
    type: 'quote',
    data: {
      qq: '100000',
    },
  }]);
});

test('Find string5.', () => {
  expect(() => { find(string5); }).toThrow(new Error('CQ:{type} field invalid.'));
});

test('Find string5, ignoreError=true.', () => {
  expect(find(string5, { ignoreError: true })).toStrictEqual([]);
});
