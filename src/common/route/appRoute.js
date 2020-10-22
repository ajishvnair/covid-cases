import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from '../loader/ant-loader';

const StateWiseList = lazy(() => import('../../components/state-wise-listing'));

const AppRoute = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route exact path="/" to="/state" component={StateWiseList} />
            </Switch>
        </Suspense>
    );
};

export default AppRoute;
