
### useMatch

`useMatch` takes an accessor that returns the path and creates a Memo that returns match information if the current path matches the provided path. Useful for determining if a given path matches the current route.

```js
const match = useMatch(() => props.href);

return <div classList={{ active: Boolean(match()) }} />;
```

### useRoutes

Used to define routes via a config object instead of JSX. See [Config Based Routing](#config-based-routing).
