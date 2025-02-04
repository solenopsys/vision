#### `h`

This function is just an alias for the `createElement` function, it's more convenient to use if you want to use renderer in hyperscript mode just because it has a much shorter name.

Interface:

```ts
function h <P = {}> ( component: JSX.Component<P>, props: P | null, ...children: JSX.Element[] ): () => JSX.Element);
```

Usage:

```tsx
import {h} from 'renderer';

const element = h ( 'div', { class: 'foo' }, 'child' ); // => () => HTMLDivElement
```
