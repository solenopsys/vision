#### `Suspense`

This component is like `If`, the reactive alternative to the native `if`, but the fallback branch is shown automatically while there are some resources loading in the main branch, and the main branch is kept alive under the hood.

So this can be used to show some fallback content while the actual content is loading in the background.

This component relies on `useResource` to understand if there's a resource loading or not.

This component also supports a manual "when" prop for manually deciding whether the fallback branch should be rendered or not.

Interface:

```ts
function Suspense ( props: { when?: FunctionMaybe<unknown>, fallback?: JSX.Element, children: JSX.Element }): ObservableReadonly<JSX.Element>;
```

Usage:

```tsx
import {Suspense} from 'renderer';

const App = () => {
  const Content = () => {
    const resource = useResource ( () => makeSomePromise () );
    return (
      <If when={() => !resource ().pending && !resource ().error}>
        {resource ().value}
      </If>
    );
  };
  const Spinner = () => {
    return <p>Loading...</p>;
  };
  return (
    <Suspense fallback={<Spinner />}>
      <Content />
    </Suspense>
  );
};
```
