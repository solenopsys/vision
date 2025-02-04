#### `Ternary`

This component is the reactive alternative to the native ternary operator.

The first child will be rendered when the condition is truthy, otherwise the second child will be rendered.

Interface:

```ts
function Ternary ( props: { when: FunctionMaybe<unknown>, children: [JSX.Element, JSX.Element] } ): ObservableReadonly<JSX.Element>;
```

Usage:

```tsx
import {Ternary} from 'renderer';

const App = () => {
  const visible = $(false);
  const toggle = () => visible ( !visible () );
  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <Ternary when={visible}>
        <p>Visible :)</p>
        <p>Invisible :(</p>
      </Ternary>
    </>
  );
};
```