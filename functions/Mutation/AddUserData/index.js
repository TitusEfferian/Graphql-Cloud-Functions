const graphql = require('graphql');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const addType = new graphql.GraphQLObjectType({
    name: 'AddUserDataResult',
    fields: {
        message: {
            type: graphql.GraphQLString,
        },
        success: {
            type: graphql.GraphQLBoolean,
        }
    }
})

const AddUserData = {
    type: addType,
    resolve: async ({ name, nim }) => {
        try {
            await db.collection('users').doc('users').set({ name, nim })
            return {
                message: 'success insert data',
                success: true,
            }
        } catch(error) {
            return {
                message: error.toString(),
                success: false,
            }
        }
    },
    args: {
        name: {
            type: graphql.GraphQLString,
        },
        nim: {
            type: graphql.GraphQLString,
        }
    }
}

module.exports = AddUserData;