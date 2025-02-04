#### `ObservableOptions`

This type describes the options object that various functions can accept to tweak how the underlying Observable works.

Interface:

```ts
type ObservableOptions<T> = {
  equals?: ((value: T, valuePrev: T) => boolean) | false;
};
```
