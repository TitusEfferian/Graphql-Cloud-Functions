
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLObjectType, GraphQLSchema, } = require('graphql');
const GetUserQuery = require('./Query/GetUserQuery/index');
const GetPingQuery = require('./Query/GetPingQuery/index');
const AddUserData = require('./Mutation/AddUserData/index');
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        GetUserQuery,
        GetPingQuery,
    },
})

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        AddUserData,
    }
})

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
})

const app = express();

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

exports.graphql = functions.region('asia-east2').https.onRequest(app)