#### `render`

This function mounts a component inside a provided DOM element and returns a disposer function for unmounting it and stopping all reactivity inside it.

Interface:

```ts
function render ( child: JSX.Element, parent?: HTMLElement | null ): Disposer;
```

Usage:

```tsx
import {render} from 'renderer';

const App = () => <p>Hello, World!</p>;

const dispose = render ( <App />, document.body );

dispose (); // Unmounted and all reactivity inside it stopped
```
