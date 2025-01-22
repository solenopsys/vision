#### `DynamicLazy`

This component load component from module dynamically.

Interface:

```ts
function DynamicLazy <P = {}> ( props: { component: "path [module]:[component]", props?: FunctionMaybe<P | null>, children?: JSX.Element }): JSX. Element;
```

Usage:

```tsx
import {Dynamic} from 'renderer';

const App = () => {
  const heading = 'h2';
  return (
    <DynamicLazy component={"@solenopsys/my-module:MyComponent"}>
      Some content
    </DynamicLazy>
  );
};
```