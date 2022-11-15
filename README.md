## CQCode { Parse, Serialize, Find }

### Usage:

#### + Parse

```
import { parse } from 'cqcode';

parse('[CQ:at,qq=100000]');
// { type: 'at', data: { qq: '100000' } }
```

#### + Serialize

```
import { serialize } from 'cqcode';

serialize({ type: 'at', data: { qq: '100000' } });
// '[CQ:at,qq=100000]'
```

#### + Find

```
import { find } from 'cqcode';

interface FindProps {
  type: string | string[]; // filters
}

find('This is a [CQ:at,qq=100000] long message.', { type: 'at' });
// [{ type: 'at', data: { qq: '100000' } }]
```

#### + Split (similar to find)

```
import { split } from 'cqcode';

interface SplitProps {
  type: string | string[]; // filters
}

split('This is a [CQ:at,qq=100000] long message.', { type: ['at', 'plain'] });
// [{ type: 'plain', data: { text: 'This is a ' } }, { type: 'at', data: { qq: '100000' } }, { type: 'plain', data: { text: ' long message.' } }]
```
