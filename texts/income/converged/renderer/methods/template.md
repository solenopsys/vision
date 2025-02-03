#### `template`

This function enables constructing elements with [Solid](https://www.solidjs.com)-level performance without using the Babel transform, but also without the convenience of that.

It basically works like [sinuous](https://github.com/luwes/sinuous/tree/master)'s template function, but with a cleaner API, since you don't have to access your props any differently inside the template here.

Basically you can use this to wrap a component that doesn't directly create any observables or call any hooks to significanly improve performance when instantiating that component.

Interface:

```ts
function template <P = {}> ( fn: (( props: P ) => JSX.Element) ): (( props: P ) => () => Element);
```

Usage:

```tsx
import {template} from 'renderer';

const Row = template ( ({ id, cls, label, onSelect, onRemove }) => { // Now Row is super fast to instantiate
  return (
    <tr class={cls}>
      <td class="col-md-1">{id}</td>
      <td class="col-md-4">
        <a onClick={onSelect}>{label}</a>
      </td>
      <td class="col-md-1">
        <a onClick={onRemove}>
          <span class="glyphicon glyphicon-remove" ariaHidden={true}></span>
        </a>
      </td>
      <td class="col-md-6"></td>
    </tr>
  );
});

const Table = () => {
  const rows = [ /* props for all your rows here */ ];
  return rows.map ( row => <Row {...row}> );
};


```