import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
// import * as AbsintheSocket from "@absinthe/socket";
// import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
// import { Socket as PhoenixSocket } from "phoenix";

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split
} from '@apollo/client';

// allow authentication cookie cross site/same site:
// https://www.apollographql.com/docs/react/networking/authentication#cookie
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/api/graphiql',
  credentials: 'include'
});

// const phoenixSocket = new PhoenixSocket("ws://localhost:4000/websocket", { params: { current_user: "1" } });

// const absintheSocket = AbsintheSocket.create(phoenixSocket);

// const wsLink = createAbsintheSocketLink(absintheSocket);

const wsLink = new GraphQLWsLink(createClient({
  url: "ws://localhost:4000/graphql/websocket",
  connectionParams: {
    topic: "*",
    current_user: "1"
  }
}))

console.log("wsLink", wsLink)

const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

console.log("client", client)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
