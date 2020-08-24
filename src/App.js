import React from 'react';
import './App.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {
          routes && routes.map((route, index) => {
            return <Route key={index} path={route.path} exact={true} component={props => {
              return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
              )
            }} />
          })
        }
      </Switch>
    </BrowserRouter>
  )
}

export default App;