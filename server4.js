const express = require('express');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');

// Passing Parameters

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    rollDice: function ({numDice, numSides = 6}) {
        let output = [];
        for (let i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * numSides));
        }
        return output;
    }
};

// Spin up a server to receive graphql queries
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.post('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
