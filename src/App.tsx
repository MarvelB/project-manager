import NavBar from 'components/NavBar/NavBar';
import Sidebar from 'components/Sidebar/Sidebar';
import { useAuthContext } from 'hooks/useAuthContext';
import Create from 'pages/Create/Create';
import Dashboard from 'pages/Dashboard/Dashboard';
import Login from 'pages/Login/Login';
import Project from 'pages/Project/Project';
import Signup from 'pages/Signup/Signup';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {

  const { isAuthReady, user } = useAuthContext();

  return (
    <div className="App">
      {isAuthReady && (
        <BrowserRouter>

          <Sidebar />

          <div className="container">

            <NavBar />

            <Switch>

              <Route path="/login">
                {!user && <Login />}
                {user && <Redirect to="/" />}
              </Route>

              <Route path="/signup">
                {!user && <Signup />}
                {user && <Redirect to="/" />}
              </Route>

              <Route path="/create">
                {user && <Create />}
                {!user && <Redirect to="/login" />}
              </Route>

              <Route path="/projects/:id">
                {user && <Project />}
                {!user && <Redirect to="/login" />}
              </Route>

              <Route path="/" exact>
                {user && <Dashboard />}
                {!user && <Redirect to="/login" />}
              </Route>

            </Switch>

          </div>

        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
