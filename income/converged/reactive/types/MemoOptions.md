#### `MemoOptions`

This type describes the options object that memos can accept to tweak how they work.

Interface:

```ts
type MemoOptions<T = unknown> = {
  equals?: ((value: T, valuePrev: T) => boolean) | false;
  sync?: boolean;
};
```