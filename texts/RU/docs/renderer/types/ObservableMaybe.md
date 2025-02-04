#### `ObservableMaybe`

This type says that something can be the value itself or an observable to that value.

This is super useful if you want to write components and hooks that can accept either plain values or observables to those values.

Interface:

```ts
type ObservableMaybe<T> = Observable<T> | ObservableReadonly<T> | T;
```

Usage:

```tsx
import type {ObservableMaybe} from 'renderer';

const Button = ({ label }: { label: ObservableMaybe<string> }): JSX.Element => {
  return <button>{label}</button>;
};
```