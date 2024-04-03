import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { App } from './App.tsx'

const host = import.meta.env.PROD ? "https://simply-wall-challenge.onrender.com/graphql" : "http://localhost:3000/graphql";
const httpLink = createHttpLink({ uri: host });
const client = new ApolloClient({ cache: new InMemoryCache(), link: httpLink });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
