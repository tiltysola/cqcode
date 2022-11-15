const { parse, serialize, find, split } = require('../dist');

console.log(parse('[CQ:at,qq=100000]'));
console.log(serialize({ type: 'at', data: { qq: '100000' } }));
console.log(find('This is a [CQ:at,qq=100000] long message.', { type: 'at' }));
console.log(split('This is a [CQ:at,qq=100000] long message.\n Why not emit an image? [CQ:image,url=undefined]'));
console.log(split('[CQ:at,qq=100000] Bug always found here. [CQ:image,url=undefined]'));
console.log(split('[CQ:at,qq=100000]'));
