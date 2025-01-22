

#### `FunctionMaybe`

This type says that something can be the value itself or a function that returns that value.

It's useful at times since some components, like `If`, accept `when` conditions wrapped in `FunctionMaybe`.

Interface:

```ts
type FunctionMaybe<T> = (() => T) | T;
```

Usage:

```tsx
import type {FunctionMaybe} from 'renderer';

const SomeConditionalComponent = ( when: FunctionMaybe<boolean>, value: string ): JSX.Element => {
  return (
    <If when={when}>
      {value}
    </If>
  );
};
```