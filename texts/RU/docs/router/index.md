# Router
Based on [Voby Router](https://github.com/vobyjs/voby-router)

The router for [Converged-Renderer](https://github.com/solenopsys/converged-renderer).
---


A router lets you change your view based on the URL in the browser. This allows your "single-page" application to simulate a traditional multipage site. To use Converged Router, you specify components called Routes that depend on the value of the URL (the "path"), and the router handles the mechanism of swapping them in and out.

Converged-Renderer router is a universal router for Converged Renderer - it works whether you're rendering on the client or on the server. It was inspired by and combines paradigms of React Router and the Ember Router. Routes can be defined directly in your app's template using JSX, but you can also pass your route configuration directly as an object. It also supports nested routing, so navigation can change a part of a component, rather than completely replacing it. 

Use it freely with suspense, resources, and lazy components. Converged-Renderer router also allows you to define a data function that loads parallel to the routes ([render-as-you-fetch](https://epicreact.dev/render-as-you-fetch/)).



