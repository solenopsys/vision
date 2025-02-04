### useSearchParams

Retrieves a tuple containing a reactive object to read the current location's query parameters and a method to update them. The object is a proxy so you must access properties to subscribe to reactive updates. Note values will be strings and property names will retain their casing.

The setter method accepts an object whose entries will be merged into the current query string. Values `''`, `undefined` and `null` will remove the key from the resulting query string. Updates will behave just like a navigation and the setter accepts the same optional second parameter as `navigate` and auto-scrolling is disabled by default.

```js
const [searchParams, setSearchParams] = useSearchParams();

return (
  <div>
    <span>Page: {searchParams.page}</span>
    <button onClick={() => setSearchParams({ page: searchParams.page + 1 })}>Next Page</button>
  </div>
);
```
