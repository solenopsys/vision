### useRouteData

Retrieves the return value from the data function.

> In previous versions you could use numbers to access parent data. This is no longer supported. Instead the data functions themselves receive the parent data that you can expose through the specific nested routes data.

```js
const user = useRouteData();

return <h1>{user().name}</h1>;
```
