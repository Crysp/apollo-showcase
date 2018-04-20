const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');

const schema = require('./data/schema');

const GRAPHQL_PORT = 3001;

const graphQLServer = express();

graphQLServer.use(cors());
graphQLServer.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
        schema,
        // This option turns on tracing
        tracing: true
    })
);

graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
    console.log(
        `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
    )
);