const { makeExecutableSchema } = require('graphql-tools');

const authors = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
    { id: 4, firstName: 'Username', lastName: 'Kokokoko' },
];
const profile = authors[3];
const posts = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 }
];
const schemaString = `
    type Author {
        id: Int!
        firstName: String
        lastName: String
        """
        the list of Posts by this author
        """
        posts: [Post]
    }
    type Profile {
        id: Int!
        firstName: String
        lastName: String
    }
    type Post {
        id: Int!
        title: String
        author: Author
        votes: Int
    }

    # the schema allows the following query:
    type Query {
        profile: Profile
        posts: [Post]
        author(id: Int!): Author
        post(id: Int!): Post
    }

    # this schema allows the following mutation:
    type Mutation {
        createPost (title: String!): Post
        upvotePost (
            postId: Int!
        ): Post
    }
`;
const schema = makeExecutableSchema({
    typeDefs: schemaString,
    resolvers: {
        Query: {
            posts: () => posts,
            post: (_, { id }) => posts.find(post => post.id === id)
        },
        Mutation: {
            createPost: (_, { title }) => {
                posts.push({
                    id: posts[posts.length - 1].id + 1,
                    title,
                    authorId: profile.id,
                    votes: 0
                });
                return posts[posts.length - 1];
            },
            upvotePost: (_, { postId }) => {
                const post = posts.find(({ id }) => id === postId);
                if (!post) {
                    throw new Error(`Couldn't find post with id ${postId}`);
                }
                post.votes += 1;
                return post;
            },
        },
        Post: {
            author: post => authors.find(({ id }) => id === post.authorId)
        },
    }
});
// addMockFunctionsToSchema({ schema });


module.exports = schema;