### useLocation

Retrieves reactive `location` object useful for getting things like `pathname`

```js
const location = useLocation();

const pathname = useComputed(() => parsePath(location.pathname));
```