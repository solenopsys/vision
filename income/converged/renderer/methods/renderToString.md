#### `renderToString`

This works just like `render`, but it returns a Promise to the HTML representation of the rendered component.

This is currently implemented in a way that works only inside a browser-like environement, so you'll need to use [JSDOM](https://github.com/jsdom/jsdom) or similar for this to work server-side, but it can work server-side too potentially.

This function automatically waits for all `Suspense` boundaries to resolve before returning.

Interface:

```ts
function renderToString ( child: JSX.Element ): Promise<string>;
```

Usage:

```tsx
import {renderToString} from 'renderer';

const App = () => <p>Hello, World!</p>;

const html = await renderToString ( <App /> );
```

