const graphql = require('graphql');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const db = admin.firestore();

const arrayOfUsers = new graphql.GraphQLObjectType({
    name: 'ArrayOfUsers',
    fields: {
        nim: {
            type: graphql.GraphQLString,
        },
        name:{
            type: graphql.GraphQLString,
        }
    }
})

const userType = new graphql.GraphQLObjectType({
    name: 'UserData',
    fields: {
        success: {
            type: graphql.GraphQLBoolean,
        },
        rawData: {
            type: graphql.GraphQLString,
        },
        arrayOfUsers: {
            type: graphql.GraphQLList(arrayOfUsers),
        }
    }
})

const GetUserQuery = {
    type: userType,
    resolve: async () => {
        const result = await db.collection('users').get();
        const data = []
        result.forEach((doc) => {
            data.push(doc.data())
        })
        return {
            success: true,
            rawData: JSON.stringify(result),
            arrayOfUsers: data,
        };
    },
}

module.exports = GetUserQuery

