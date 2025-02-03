## Dynamic Routes

If you don't know the path ahead of time, you might want to treat part of the path as a flexible parameter that is passed on to the component. 

```jsx
import { lazy } from  "@solenopsys/converged-renderer";
import { Routes, Route } from "@solenopsys/converged-router"
const Users = lazy(() => import("./pages/Home"));
const Home = lazy(() => import("./pages/Users"));
const Home = lazy(() => import("./pages/User"));

export default function App() {
  return (
    <>
      <h1>My Site with Lots of Pages</h1>
      <Routes>
        <Route path="/users" element={<Users/>} />
        <Route path="/users/:id" element={<User/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<div>This site was made with Converged-Renderer</div>} />
      </Routes>
    <>
  )
}
```

The colon indicates that `id` can be any string, and as long as the URL fits that pattern, the `User` component will show.

You can then access that `id` from within a route component with `useParams`:

```jsx
//async fetching function
import { fetchUser } ...

export default function User () {

  const params = useParams();

  const [userData] = createResource(() => params.id, fetchUser);

  return <A href={userData.twitter}>{userData.name}</A>
}
```