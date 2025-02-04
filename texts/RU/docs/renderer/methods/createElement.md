#### `createElement`

This is the internal function that will make DOM nodes and call/instantiate components, it will be called for you automatically via JSX.

Interface:

```ts
function createElement <P = {}> ( component: JSX.Component<P>, props: P | null, ...children: JSX.Element[] ): () => JSX.Element);
```

Usage:

```tsx
import {createElement} from 'renderer';

const element = createElement ( 'div', { class: 'foo' }, 'child' ); // => () => HTMLDivElement
```
