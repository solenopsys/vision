#### `hmr`

This function wraps a component and makes it HMR-aware, for implementations of HMR like Vite's, this makes the component refresh itself and its children without requiring a reload of the whole page.

For an automated way to make all your components HMR-aware check out [`renderer-vite`](https://github.com/rendererjs/renderer-vite) instead.

Interface:

```ts
function hmr <T extends Function> ( accept: Function, component: T ): T;
```

Usage:

```tsx
import {hmr} from 'renderer';

// Define a component

const Counter = ({ value }): JSX.Element => {
  // Return something...
};

// Optionally attach components and other values to it

Counter.Button = ({ onClick }): JSX.Element => {
  // Return something...
};

Counter.INITIAL_VALUE = 0;

// Lastly export it as "default", wrapped in "hmr"
// Only components exported as "default" are supported

export default hmr ( import.meta.hot?.accept, Counter );
```
