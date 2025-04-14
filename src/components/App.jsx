//import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function App() {
  //const [count, setCount] = useState(0);

  // useEffect(
  //   () => {
  //     // execute side effect
  //     return () => {
  //       // cleanup function on unmounting or re-running effect
  //     }
  //   },
  //   // optional dependency array
  //   [/* 0 or more entries */]
  // )

  return (
    <>
      <h1>Hello world!</h1>
      <h2>
        <Link to="/page/pageone">Page One</Link>
      </h2>
      <h2>
        <Link to="/page/pagetwo">Page Two</Link>
      </h2>
    </>
  );
}

export default App;

// DEFAULT
// npm create vite @latest. -- --template react
// npm install
// npm install --save -dev--save -exact prettier

// ROUTING
// npm install react-router-dom

// TYPING
// npm install --save prop-types

// TESTING
// npm install vitest --save-dev
// npm install jsdom --save-dev
// npm install @testing-library/react @testing-library/jest-dom --save-dev
