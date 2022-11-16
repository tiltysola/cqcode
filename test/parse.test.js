const { parse } = require('../');

const string1 = '[CQ:at,qq=100000]';
const string2 = '[CQ:at]';
const string3 = '[CQ:at,]';
const string4 = '[CQ:at,qq:10000]';
const string5 = '[]';
const string6 = '[CQ=at]';
const string7 = '[BQ:at,qq:10000]';
const string8 = '[CQ:at,qq=100000';
const string9 = 'CQ:at,qq=100000]';

test('Parse string1.', () => {
  expect(parse(string1)).toStrictEqual({
    type: 'at',
    data: {
      qq: '100000',
    },
  });
});

test('Parse string2.', () => {
  expect(parse(string2)).toStrictEqual({
    type: 'at',
    data: {},
  });
});

test('Parse string3.', () => {
  expect(parse(string3)).toStrictEqual({
    type: 'at',
    data: {},
  });
});

test('Parse string4.', () => {
  expect(parse(string4)).toStrictEqual({
    type: 'at',
    data: {},
  });
});

test('Parse string5.', () => {
  expect(() => { parse(string5); }).toThrow(new Error('CQ:{type} field invalid.'));
});

test('Parse string6.', () => {
  expect(() => { parse(string6); }).toThrow(new Error('CQ:{type} field invalid.'));
});

test('Parse string7.', () => {
  expect(() => { parse(string7); }).toThrow(new Error('Could not find CQ:{type} field.'));
});

test('Parse string8.', () => {
  expect(() => { parse(string8); }).toThrow(new Error('Not a valid CQCode string.'));
});

test('Parse string9.', () => {
  expect(() => { parse(string9); }).toThrow(new Error('Not a valid CQCode string.'));
});
