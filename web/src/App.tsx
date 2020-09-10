import React from "react";
import "./App.css";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import HomePage from "./page/home";
import Room from "./page/room";
import AuthorPage from "./page/author";
import { PageRoutePath } from "./routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={PageRoutePath.Index}>
            <HomePage />
          </Route>
          <Route exact path={PageRoutePath.Room}>
            <Room />
          </Route>
          <Route exact path={PageRoutePath.Author}>
            <AuthorPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
