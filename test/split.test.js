const { split } = require('../');

const string1 = 'This is a long message.';
const string2 = '[CQ:at,qq=100000]';
const string3 = 'This is a [CQ:at,qq=100000] long message.';
const string4 = 'This is a [CQ:at,qq=100000] long message. This is the second [CQ:quote,qq=100000] long message.';

test('Split string1.', () => {
  expect(split(string1)).toStrictEqual([{
    type: 'plain',
    data: {
      text: 'This is a long message.',
    },
  }]);
});

test('Split string2.', () => {
  expect(split(string2)).toStrictEqual([{
    type: 'at',
    data: {
      qq: '100000',
    },
  }]);
});

test('Split string2, type="at".', () => {
  expect(split(string2, { type: 'at' })).toStrictEqual([{
    type: 'at',
    data: {
      qq: '100000',
    },
  }]);
});

test('Split string2, type=["at"].', () => {
  expect(split(string2, { type: ['at'] })).toStrictEqual([{
    type: 'at',
    data: {
      qq: '100000',
    },
  }]);
});

test('Split string2, type="never".', () => {
  expect(split(string2, { type: 'never' })).toStrictEqual([]);
});

test('Split string3.', () => {
  expect(split(string3)).toStrictEqual([{
    type: 'plain',
    data: {
      text: 'This is a ',
    },
  }, {
    type: 'at',
    data: {
      qq: '100000',
    },
  }, {
    type: 'plain',
    data: {
      text: ' long message.',
    },
  }]);
});

test('Split string4.', () => {
  expect(split(string4)).toStrictEqual([{
    type: 'plain',
    data: {
      text: 'This is a ',
    },
  }, {
    type: 'at',
    data: {
      qq: '100000',
    },
  }, {
    type: 'plain',
    data: {
      text: ' long message. This is the second ',
    },
  }, {
    type: 'quote',
    data: {
      qq: '100000',
    },
  }, {
    type: 'plain',
    data: {
      text: ' long message.',
    },
  }]);
});

test('Split string4, type="at".', () => {
  expect(split(string4, { type: 'at' })).toStrictEqual([{
    type: 'at',
    data: {
      qq: '100000',
    },
  }]);
});

test('Split string4, type=["at", "plain"].', () => {
  expect(split(string4, { type: ['at', 'plain'] })).toStrictEqual([{
    type: 'plain',
    data: {
      text: 'This is a ',
    },
  }, {
    type: 'at',
    data: {
      qq: '100000',
    },
  }, {
    type: 'plain',
    data: {
      text: ' long message. This is the second ',
    },
  }, {
    type: 'plain',
    data: {
      text: ' long message.',
    },
  }]);
});
