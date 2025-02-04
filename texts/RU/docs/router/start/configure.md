
### Configure Your Routes

` @solenopsys/converged-router` allows you to configure your routes using JSX:

1. Use the `Routes` component to specify where the routes should appear in your app.


```jsx
import { Routes, Route } from "@solenopsys/converged-router"

export default function App() {
  return (
    <>
      <h1>My Site with Lots of Pages</h1>
      <Routes>

      </Routes>
    <>
  )
}
```

2. Add each route using the `Route` component, specifying a path and an element to render when the user navigates to that path.

```jsx
import { Routes, Route } from "@solenopsys/converged-router"

import Home from "./pages/Home"
import Users from "./pages/Users"

export default function App() {
  return (
    <>
      <h1>My Site with Lots of Pages</h1>
      <Routes>
        <Route path="/users" element={<Users/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<div>This site was made with Converged-Renderer</div>} />
      </Routes>
    <>
  )
}
```

3. Lazy-load route components

This way, the `Users` and `Home` components will only be loaded if you're navigating to `/users` or `/`, respectively.

```jsx
import { lazy } from  "@solenopsys/converged-renderer";
import { Routes, Route } from "@solenopsys/converged-router"
const Users = lazy(() => import("./pages/Home"));
const Home = lazy(() => import("./pages/Users"));

export default function App() {
  return (
    <>
      <h1>My Site with Lots of Pages</h1>
      <Routes>
        <Route path="/users" element={<Users/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<div>This site was made with Converged-Renderer</div>} />
      </Routes>
    <>
  )
}
```
