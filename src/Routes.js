import React from 'react';
import GameView from './views/GameView';
import BetweenView from './views/BetweenView';
import { Switch, Route } from 'react-router-dom';

export default () => {
    return (
        <Switch>
            <Route exact path = "/" component={GameView} />
            <Route exact path = "/between" component={BetweenView} />
        </Switch>
    );
};
