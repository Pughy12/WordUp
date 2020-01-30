import React from 'react';
import Home from './views/Home';
import { Switch, Route } from 'react-router-dom';

export default () => {
    return (
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
    );
};
