
## Data Functions
In the [above example](#dynamic-routes), the User component is lazy-loaded and then the data is fetched. With route data functions, we can instead start fetching the data parallel to loading the route, so we can use the data as soon as possible.

To do this, create a function that fetches and returns the data using `createResource`. Then pass that function to the `data` prop of the `Route` component. 


```js
import { lazy } from  "@solenopsys/converged-renderer";
import { Route } from "@solenopsys/converged-router";
import { fetchUser } ... 

const User = lazy(() => import("/pages/users/[id].js"));

//Data function
function UserData({params, location, navigate, data}) {
  const [user] = createResource(() => params.id, fetchUser);
  return user;
}

//Pass it in the route definition
<Route path="/users/:id" element={<User />} data={UserData} />;
```

When the route is loaded, the data function is called, and the result can be accessed by calling `useRouteData()` in the route component.

```jsx
//pages/users/[id].js
import { useRouteData } from ' @solenopsys/converged-router';
export default function User() {
  const user = useRouteData();
  return <h1>{user().name}</h1>;
}
```

As its only argument, the data function is passed an object that you can use to access route information:

| key       | type                                           | description                                                                                                 |
|-----------|------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| params    | object                                         | The route parameters (same value as calling `useParams()` inside the route component)                       |
| location  | `{ pathname, search, hash, query, state, key}` | An object that you can use to get more information about the path (corresponds to [`useLocation()`](#uselocation))          |
| navigate | `(to: string, options?: NavigateOptions) => void`                        | A function that you can call to navigate to a different route instead (corresponds to [`useNavigate()`](#usenavigate))     |
| data      | unknown                                        | The data returned by the [parent's](#nested-routes) data function, if any. (Data will pass through any intermediate nesting.) |

A common pattern is to export the data function that corresponds to a route in a dedicated `route.data.js` file. This way, the data function can be imported without loading anything else.

```js
import { lazy } from  "@solenopsys/converged-renderer";
import { Route } from "@solenopsys/converged-router";
import { fetchUser } ... 
import UserData from "./pages/users/[id].data.js";
const User = lazy(() => import("/pages/users/[id].js"));

// In the Route definition
<Route path="/users/:id" element={<User />} data={UserData} />;
```

