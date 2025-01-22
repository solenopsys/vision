
#### `KeepAlive`

This component allows you to create singleton instances of other components that survive their parent components being disposed, and can therefore be reused cheaply.

Components rendered inside a `KeepAlive` are detached from the rest of the reactivity graph, so they don't inherit any context provided outside of their parent `KeepAlive` wrapper.

Components rendered inside a `KeepAlive` are kept in memory until the wrapper `KeepAlive` is unmounted and `ttl` milliseconds have passed without another `KeepAlive` with the same `id` being mounted. Or never, if no `ttl` prop is provided.

Interface:

```ts
function KeepAlive ( props: { id: FunctionMaybe<string>, ttl?: FunctionMaybe<number>, children: JSX.Element } ): ObservableReadonly<JSX.Element>;
```

Usage:

```tsx
import {KeepAlive} from 'renderer';

// Render some expensive component inside a KeepAlive

const App = () => {
  return (
    <KeepAlive id="some-unique-id" ttl={60_000}>
      <SomeExpensiveComponent />
    </KeepAlive>
  );
};
```