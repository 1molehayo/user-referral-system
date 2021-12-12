import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react';
import PropTypes from 'prop-types';
import {
  LOGIN_START,
  LOGIN_COMPLETED,
  LOGOUT_START,
  LOGOUT_COMPLETED
} from 'utility/constants';
import axios from 'services/Axios';

const ContextDefaultValues = {
  isAuthenticated: false,
  loading: true
};

const CurrentUserStateContext = createContext(ContextDefaultValues);
const CurrentUserDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, ...action.user, loading: true };
    case LOGIN_COMPLETED:
      return {
        ...state,
        ...action.user,
        isAuthenticated: true,
        loading: false
      };
    case LOGOUT_START:
      return { loading: true };
    case LOGOUT_COMPLETED:
      return { loading: false, isAuthenticated: false };
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, ContextDefaultValues);

  const fetchUser = useCallback(async () => {
    dispatch({ type: LOGIN_START });
    try {
      const isAuthenticated = localStorage.getItem('isAuthenticated');

      if (isAuthenticated) {
        const userData = localStorage.getItem('userData');
        if (userData) {
          return dispatch({
            type: LOGIN_COMPLETED,
            user: userData
          });
        }

        const { data } = await axios.get('/user');
        localStorage.setItem('userData', JSON.stringify(data));
        return dispatch({
          type: LOGIN_COMPLETED,
          user: data
        });
      }

      return dispatch({ type: LOGOUT_COMPLETED });
    } catch (err) {
      dispatch({ type: LOGOUT_COMPLETED });
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    fetchUser();
    return () => {};
  }, [fetchUser]);

  return (
    <CurrentUserDispatchContext.Provider value={dispatch}>
      <CurrentUserStateContext.Provider value={state}>
        {children}
      </CurrentUserStateContext.Provider>
    </CurrentUserDispatchContext.Provider>
  );
};

CurrentUserProvider.propTypes = {
  children: PropTypes.node
};

export const useCurrentUser = () => useContext(CurrentUserStateContext);
export const useDispatchCurrentUser = () =>
  useContext(CurrentUserDispatchContext);
