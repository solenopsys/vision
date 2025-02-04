#### `ObservableOptions`

This type describes the options object that various functions can accept to tweak how the underlying observable works.

Interface:

```ts
type ObservableOptions<T> = {
  equals?: (( value: T, valuePrev: T ) => boolean) | false
};
```

Usage:

```tsx
import type {Observable, ObservableOptions} from 'renderer';
import {$} from 'renderer';

const createTimestamp = ( options?: ObservableOptions ): Observable<number> => {
  return $( Date.now (), options );
};
```

