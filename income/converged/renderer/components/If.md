#### `If`

This component is the reactive alternative to the native `if`.

If a function is passed as the children then it will be called with a read-only observable that contains the current, always truthy, value of the "when" condition.

Interface:

```ts
type Truthy<T = unknown> = Extract<T, number | bigint | string | true | object | symbol | Function>;

function If <T> ( props: { when: FunctionMaybe<T>, fallback?: JSX.Element, children: JSX.Element | (( value: (() => Truthy<T>) ) => JSX.Element) }): ObservableReadonly<JSX.Element>;
```

Usage:

```tsx
import {If} from 'renderer';

const App = () => {
  const visible = $(false);
  const toggle = () => visible ( !visible () );
  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <If when={visible}>
        <p>Hello!</p>
      </If>
    </>
  );
};
```
