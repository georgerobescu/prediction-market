import reducers from "../reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";
import { routerMiddleware } from "connected-react-router";
import { generateStore } from "drizzle";

const createHistory = require("history").createHashHistory;

const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routeMiddleware];

export default function configureStore(/*initialState*/) {
  // Compose with Redux Devtools if injected
  // const composeEnhancers =
  // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  console.log(reducers(history));
  const store = generateStore({
    drizzleOptions: {
      contracts: [],
      events: {}
    },
    appReducers: reducers(history),
    appMiddlewares: middlewares,
    // appSagas: {},
    disableReduxDevTools: false // enable ReduxDevTools!
  });

  // createStore(
  // reducers(history),
  // initialState,
  // composeEnhancers(applyMiddleware(...middlewares))
  // );

  sagaMiddleware.run(rootSaga);

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept("../reducers/index", () => {
  //     const nextRootReducer = require("../reducers/index");
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }
  return store;
}

export { history };
