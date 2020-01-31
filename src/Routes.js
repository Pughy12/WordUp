import React from 'react';
import Home from './views/Home';
import GameView from './views/GameView';
import { Switch, Route } from 'react-router-dom';

export default () => {
    return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game" component={GameView} />
        </Switch>
    );
};
