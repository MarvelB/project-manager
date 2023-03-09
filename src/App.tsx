import Create from 'pages/Create/Create';
import Dashboard from 'pages/Dashboard/Dashboard';
import Login from 'pages/Login/Login';
import Project from 'pages/Project/Project';
import Signup from 'pages/Signup/Signup';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <div className="container">

          <Switch>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/create">
              <Create />
            </Route>

            <Route path="/projects/:id">
              <Project />
            </Route>

            <Route path="/" exact>
              <Dashboard />
            </Route>

          </Switch>

        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
