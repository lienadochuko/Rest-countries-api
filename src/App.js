import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";

function App() {
  return (
    <div className="header w-full">
       <Switch>
       <Route path="/Info" >
          <Info />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
