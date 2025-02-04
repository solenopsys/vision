
#### `Fragment`

This is just the internal component used for rendering fragments: `<></>`, you probably would never use this directly even if you are not using JSX, since you can return plain arrays from your components anyway.

Interface:

```ts
function Fragment ( props: { children: JSX.Element }): JSX.Element;
```

Usage:

```tsx
import {Fragment} from 'renderer';

const App = () => {
  return (
    <Fragment>
      <p>child 1</p>
      <p>child 2</p>
    </Fragment>
  );
};
```