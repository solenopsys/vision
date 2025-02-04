### Set Up the Router

```sh
> npm i  @solenopsys/converged-router
```

Install ` @solenopsys/converged-router`, then wrap your root component with the Router component:

```jsx
import { render } from  "@solenopsys/converged-renderer";
import { Router } from "@solenopsys/converged-router";
import App from "./App";

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("app")
);
```

This sets up a context so that we can display the routes anywhere in the app.
