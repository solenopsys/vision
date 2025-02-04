#### `TypeScript`

There are two main actions needed to make renderer work with TypeScript.

1. renderer is an ESM-only framework, so you _might_ need to mark your package as ESM too in order to use it, you can do that by putting the following in your `package.json`:
   ```
   "type": "module"
   ```
2. You should instruct TypeScript to load the correct JSX types by putting the following in your `tsconfig.json`:
   ```json
    {
      "compilerOptions": {
        "jsx": "react-jsx",
        "jsxImportSource": "renderer"
      }
    }
   ```
3. Optionally, if you don't want to use a bundler or if you are using a bundler for which a plugin hasn't been written yet you can just define a "React" variable in scope and just use the JSX transform for React:
   ```ts
   import * as React from 'renderer';
   ```
