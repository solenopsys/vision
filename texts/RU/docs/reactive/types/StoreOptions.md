#### `StoreOptions`

This type describes the options object that the `$.store` function can accept.

Interface:

```ts
type StoreOptions = {
  equals?: ((value: unknown, valuePrev: unknown) => boolean) | false;
};
```
