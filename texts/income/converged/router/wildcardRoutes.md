
### Wildcard Routes

`:param` lets you match an arbitrary name at that point in the path. You can use `*` to match any end of the path:

```jsx
//Matches any path that begins with foo, including foo/, foo/a/, foo/a/b/c
<Route path='foo/*' element={<Foo/>}/>
```

If you want to expose the wild part of the path to the component as a parameter, you can name it:

```jsx
<Route path='foo/*any' element={<div>{useParams().any}</div>}/>
```

Note that the wildcard token must be the last part of the path; `foo/*any/bar` won't create any routes.
