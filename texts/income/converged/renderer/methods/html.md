#### `html`

This function provides an alternative way to use the framework, without writing JSX or using the `h` function manually, it instead allows you to write your markup as tagged template literals.

[`htm`](https://github.com/developit/htm) is used under the hood, read its documentation.

Interface:

```ts
function html ( strings: TemplateStringsArray, ...values: any[] ): JSX.Element;
```

Usage:

```tsx
import {html, If} from 'renderer';

const Counter = (): JSX.Element => {
  const value = $(0);
  const increment = () => value ( prev => prev + 1 );
  const decrement = () => value ( prev => prev - 1 );
  return html`
    <h1>Counter</h1>
    <p>${value}</p>
    <button onClick=${increment}>+</button>
    <button onClick=${decrement}>-</button>
  `;
};

// Using a custom component without registering it

const NoRegistration = (): JSX.Element => {
  return html`
    <${If} when=${true}>
      <p>content</p>
    </${If}>
  `;
};

// Using a custom component after registering it, so you won't need to interpolate it anymore

html.register ({ If });

const NoRegistration = (): JSX.Element => {
  return html`
    <If when=${true}>
      <p>content</p>
    </If>
  `;
};
```