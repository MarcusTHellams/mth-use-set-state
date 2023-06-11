# mth-use-set-state

### Description
**useSetState** is a React custom hook that behaves similarly to **useState**, but its setter function merges state updates instead of overwriting the previous state. This is a familiar pattern for those who have used Redux or **this.setState** in class components.

In other words, you can use **useSetState** to maintain your component state just like **useState**, but with additional capabilities: you can pass an object that will be merged into the current state. This utility is useful when you are dealing with an object in state and want to update only some properties of the object without overwriting other properties.

**useSetState** also provides two utility methods: **resetState** and **clearState** for resetting the state to its initial value or clearing it entirely.

### Instalation
npm, yarn, or pnpm

```bash
npm install @mhellams/mth-use-set-state
yarn add @mhellams/mth-use-set-state
pnpm add @mhellams/mth-use-set-state
```

### Usage
Here's how to use the **useSetState** hook:
```ts
import { useSetState } from './useSetState';

const MyComponent = () => {
  const [state, setState, { resetState, clearState }] = useSetState({ count: 0, name: 'John' });

  return (
    <div>
      <p>{state.count}</p>
      <p>{state.name}</p>
      <button onClick={() => setState({ count: state.count + 1 })}>Increment count</button>
      <button onClick={() => setState({ name: 'Jane' })}>Change name</button>
      <button onClick={resetState}>Reset state</button>
      <button onClick={clearState}>Clear state</button>
    </div>
  );
};
```

### API
#### useSetState(initialState)
Arguments:

- initialState: T | (() => T): The initial state value. Can be an object or a function that returns an object.
##### Returns an array with three elements:

- **state: T**: The current state.
- **setState(updatedState):** A function to update the state. Accepts an object that will be merged into the current state or a function that receives the current state and returns an object that will be merged into the current state.
- **{ resetState, clearState }:** An object with two utility functions for resetting or clearing the state.
#### setState(updatedState)
##### Arguments:

- **updatedState: DeepPartial<T> | ((currentState: T) => DeepPartial<T>)**: The new state or a function that receives the current state and returns the new state. The new state will be merged into the current state.

#### resetState()
A function that resets the state to its initial value. Accepts no arguments.

#### clearState()
A function that clears the state, setting all properties to undefined. Accepts no arguments.

### Restrictions
The state managed by useSetState must be a plain object, otherwise, you should use useState.

### Example
[Example](https://stackblitz.com/edit/stackblitz-starters-eqym8p?file=src%2FApp.tsx "Example")

####License
This project is licensed under the terms of the MIT license.