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
const Login = lazy(() => import('pages/Login'));
const Contact = lazy(() => import('pages/Contact'));
const ReferAFriend = lazy(() => import('pages/ReferAFriend'));
const NotFound = lazy(() => import('pages/NotFound'));

const RouterComponent = () => {
  const [actPreload, setActPreload] = useState(true);
  const routes = [
    {
      name: '/',
      Component: Login
    },
    {
      name: '/home',
      Component: Home
    },
    {
      name: '/refer-a-friend',
      Component: ReferAFriend
    },
    {
      name: '/contact-us',
      Component: Contact
    },
    {
      name: '/404',
      Component: NotFound
    }
  ];

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
          {routes.map(({ name, Component }, i) => (
            <Route
              key={i}
              exact
              path={name}
              render={(routeProps) => (
                <Suspense fallback={null}>
                  <AnimatePresence exitBeforeEnter>
                    <Component {...routeProps} />
                  </AnimatePresence>
                </Suspense>
              )}
            />
          ))}

          <Redirect to="/404" />
        </Switch>
      </Router>
    </>
  );
};

export default RouterComponent;
