import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import PageNavigationListener from 'services/PageNavigationListener';
import { AnimatePresence } from 'framer-motion';
import { Loader } from './components';

const Home = lazy(() => import('pages/Home'));
const Contact = lazy(() => import('pages/Contact'));
const ReferAFriend = lazy(() => import('pages/ReferAFriend'));
const Page = lazy(() => import('pages/DefaultPage'));

const RouterComponent = () => {
  const [actPreload, setActPreload] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setActPreload(false);
    }, 2000);
    return () => {
      clearTimeout(t);
    };
  });

  return (
    <>
      {actPreload && <Loader />}

      <Router>
        <PageNavigationListener />

        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) => (
              <Suspense fallback={null}>
                <AnimatePresence exitBeforeEnter>
                  <Home {...routeProps} />
                </AnimatePresence>
              </Suspense>
            )}
          />

          <Route
            exact
            path="/refer-a-friend"
            render={(routeProps) => (
              <Suspense fallback={null}>
                <AnimatePresence exitBeforeEnter>
                  <ReferAFriend {...routeProps} />
                </AnimatePresence>
              </Suspense>
            )}
          />

          <Route
            exact
            path="/contact-us"
            render={(routeProps) => (
              <Suspense fallback={null}>
                <AnimatePresence exitBeforeEnter>
                  <Contact {...routeProps} />
                </AnimatePresence>
              </Suspense>
            )}
          />

          <Route
            exact
            path="/404"
            render={(routeProps) => (
              <Suspense fallback={null}>
                <AnimatePresence exitBeforeEnter>
                  <Page {...routeProps} />
                </AnimatePresence>
              </Suspense>
            )}
          />

          <Redirect to="/404" />
        </Switch>
      </Router>
    </>
  );
};

export default RouterComponent;
