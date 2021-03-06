import ApolloClient, { InMemoryCache } from 'apollo-boost';

const _host = process.env.NEXT_PUBLIC_URL;
const host = process.env.URL;

export const client = new ApolloClient({
    uri : `${host || _host }`,
    cache: new InMemoryCache(),
});
