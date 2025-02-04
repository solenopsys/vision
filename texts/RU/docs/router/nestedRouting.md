## Nested Routes
The following two route definitions have the same result:

```jsx
<Route path="/users/:id" element={<User/>} />
```
```jsx
<Route path="/users">
  <Route path="/:id" element={<User/>} />
</Route>
```
`/users/:id` renders the `<User/>` component, and `/users/` is an empty route.

Only leaf Route nodes (innermost `Route` components) are given a route. If you want to make the parent its own route, you have to specify it separately:

```jsx
//This won't work the way you'd expect
<Route path="/users" element={<Users/>}>
  <Route path="/:id" element={<User/>} />
</Route>

//This works
<Route path="/users" element={<Users/>} />
<Route path="/users/:id" element={<User/>} />

//This also works
<Route path="/users">
  <Route path="/" element={<Users/>} />
  <Route path="/:id" element={<User/>} />
</Route>
```

You can also take advantage of nesting by adding a parent element with an `<Outlet/>`.
```jsx

import { Outlet } from "@solenopsys/converged-router";

function PageWrapper () {
  return <div>
    <h1> We love our users! </h1>
    <Outlet/>
    <A href="/">Back Home</A>
  </div>
}

<Route path="/users" element={<PageWrapper/>}>
  <Route path="/" element={<Users/>} />
  <Route path="/:id" element={<User/>} />
</Route>
```
The routes are still configured the same, but now the route elements will appear inside the parent element where the `<Outlet/>` was declared.

You can nest indefinitely - just remember that only leaf nodes will become their own routes. In this example, the only route created is `/layer1/layer2`, and it appears as three nested divs.

```jsx
<Route path='/' element={<div>Onion starts here <Outlet /></div>}>
  <Route path='layer1' element={<div>Another layer <Outlet /></div>}>
    <Route path='layer2' element={<div>Innermost layer</div>}></Route>
  </Route>
</Route>
```

If you declare a `data` function on a parent and a child, the result of the parent's data function will be passed to the child's data function as the `data` property of the argument, as described in the last section. This works even if it isn't a direct child, because by default every route forwards its parent's data. 
