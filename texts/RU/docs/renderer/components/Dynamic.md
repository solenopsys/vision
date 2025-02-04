#### `Dynamic`

This component is just an alternative to `createElement` that can be used in JSX, it's useful to create a new element dynamically.

Interface:

```ts
function Dynamic <P = {}> ( props: { component: ObservableMaybe<JSX.Component<P>, props?: FunctionMaybe<P | null>, children?: JSX.Element }): JSX. Element;
```

Usage:

```tsx
import {Dynamic} from 'renderer';

const App = () => {
  const heading = 'h2';
  return (
    <Dynamic component={heading}>
      Some content
    </Dynamic>
  );
};
```