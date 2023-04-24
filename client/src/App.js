// Imports React Router into the Project
import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";

import './style.css'

// Creates the Routes
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Books /> }/>
          <Route path="/add" element={ <Add /> }/>
          <Route path="/update/:id" element={ <Update /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

