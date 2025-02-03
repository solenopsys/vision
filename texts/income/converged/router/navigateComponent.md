
### The Navigate Component
` @solenopsys/converged-router` provides a `Navigate` component that works similarly to `A`, but it will _immediately_ navigate to the provided path as soon as the component is rendered. It also uses the `href` prop, but you have the additional option of passing a function to `href` that returns a path to navigate to:

```jsx
function getPath ({navigate, location}) {
  //navigate is the result of calling useNavigate(); location is the result of calling useLocation(). 
  //You can use those to dynamically determine a path to navigate to
  return "/some-path";
}

//Navigating to /redirect will redirect you to the result of getPath
<Route path="/redirect" element={  <Navigate href={getPath}/>} />
```


