# CQCode Helper
> 可对CQCode进行解析、序列化、寻找等操作的一个工具集合。

## 方法列表

##### 1. parse: 解析CQCode字符串
##### 2. serialize: 序列化一个CQCode对象
##### 3. find: 在字符串中寻找可能的CQCode对象(数组)
##### 4. split: 将字符串转化为CQCode对象(数组), 未识别的转化为type="plain"的对象

## 使用方法

#### parse
传入一个字符串，若为合法的CQCode字符串，将会被解析为一个CQCode对象；若为不合法的CQCode字符串，则会抛出异常。

##### 示例
```
import { parse } from 'cqcode';

parse('[CQ:at,qq=100000]');
```

##### 输出
```
{
  type: 'at',
  data: {
    qq: '100000'
  }
}
```

#### serialize
传入一个CQCode对象，将会被序列化为一个CQCode字符串。

##### 示例
```
import { serialize } from 'cqcode';

serialize({ type: 'at', data: { qq: '100000' } });
```

##### 输出
```
'[CQ:at,qq=100000]'
```

#### find
传入一个字符串，将会在其中寻找可能的CQCode对象，将其转化为一个数组返回。

##### 申明
```
interface FindProps {
  type: string | string[]; // 筛选CQCode的类型，不在其中的将会被排除。默认：undefined
  ignoreError: boolean; // 是否忽略错误，为false时解析失败将会抛出异常。默认：false
}
```

##### 示例
```
import { find } from 'cqcode';

find('This is a [CQ:at,qq=100000] long message.', { type: 'at' });
```

##### 输出
```
[
  {
    type: 'at',
    data: {
      qq: '100000'
    }
  }
]
```

#### split
传入一个字符串，将按顺序解析CQCode字符串，解析失败或不为CQCode对象的部分返回type="plain"的CQCode对象。

##### 申明
```
interface SplitProps {
  type: string | string[]; // 筛选CQCode的类型，不在其中的将会被排除。默认：undefined
}
```

##### 示例
```
import { split } from 'cqcode';

split('This is a [CQ:at,qq=100000] long message.', { type: ['at', 'plain'] });
```

##### 输出
```
[
  {
    type: 'plain',
    data: {
      text: 'This is a '
    }
  }, {
    type: 'at',
    data: {
      qq: '100000'
    }
  }, {
    type: 'plain',
    data: {
      text: ' long message.'
    }
  }
]
```
