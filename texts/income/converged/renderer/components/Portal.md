#### `Portal`

This component mounts its children inside a provided DOM element, or inside `document.body` otherwise.

The `mount` prop can also be an observable, if its value changes the portal is reparented.

The `when` prop can be used to apply the portal conditionally, if it explicitly resolves to false then children are mounted normally, as if they weren't wrapped in a portal.

Events will propagate natively, according to the resulting DOM hierarchy, not the components hierarchy.

Interface:

```ts
function Portal ( props: { when: boolean, mount?: JSX.Element, wrapper?: JSX.Element, children: JSX.Element }): (() => JSX.Element | null) & ({ metadata: { portal: HTMLDivElement } });
```

Usage:

```tsx
import {Portal} from 'renderer';

const Modal = () => {
  // Some modal component maybe...
};

const App = () => {
  return (
    <Portal mount={document.body}>
      <Modal />
    </Portal>
  );
};
```
