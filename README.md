# Custom React Hooks

Simple, but very useful react custom hooks:

- usePreviousState
- useFetch
- useLoadingWithDelay
- useLocalStorage
- useOnline
- useScrollPosition
- useMousePosition
- useWindowDimensions

## Install

Inside your React project, run:

`yarn add custom-react-hooks`

or with npm:

`npm install custom-react-hooks`

## Examples

#### useFetch

#### useLoadingWithDelay

```JSX
function User() {
  const { data, error, loading } = useFetch(
    "https://api.github.com/users/lukibw"
  );

  // If loading time is logner than 200 miliseconds, display spinner, progress bar, etc.
  const spinner = useLoadingWithDelay(loading, 200);

  return (
    <div>
      <h2>User: </h2>
      {spinner && <div>Spinner here</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div>
          <p>Login: {data.login}</p>
          <p>URL: {data.url}</p>
          <p>Name: {data.name}</p>
        </div>
      )}
    </div>
  );
}
```

#### useLocalStorage

#### usePreviousState

```JSX
function LocalStorage() {
  const [value, setValue] = useLocalStorage("number");
  const previousStateValue = usePreviousState(value);

  return (
    <div>
      <h2>Local Storage</h2>
      <p>Current value for the item: {value ?? ""}</p>
      <p>Previous value for the item: {previousStateValue ?? ""}</p>
      <button onClick={() => setValue(Math.floor(Math.random() * 10000000))}>
        Set random number
      </button>
    </div>
  );
}
```

#### useMousePosition

#### useScrollPosition

#### useWindowDimensions

#### useOnline

```JSX
function Info() {
  const mousePosition = useMousePosition();
  const scrollPosition = useScrollPosition();
  const [width, height] = useWindowDimensions();
  const isOnline = useOnline();

  return (
    <div>
      <h2>Info:</h2>
      {mousePosition && (
        <p>
          X: {mousePosition.x} Y: {mousePosition.y}
        </p>
      )}
      <p>
        Window dimensions: {width} x {height}
      </p>
      <p>Scroll position: {scrollPosition}</p>
      <p>Network status: {isOnline ? "Online" : "Offline"}</p>
    </div>
  );
}
```
