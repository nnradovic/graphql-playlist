const graphql = require('graphql');
const _ =require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull // Not accept null is ome sort of validation
     } = graphql;

//dummy data
// var books = [
//     {name:'Name of the wind', genre:'Fantasy',id:'1', authorId:'1'},
//     {name:'Galactica', genre:'SC-Fi',id:'2', authorId:'2'},
//     {name:'Police Academy', genre:'Comedy',id:'3', authorId:'3'},
//     {name:'The hero og age', genre:'Fantasy',id:'2', authorId:'1'},
//     {name:'Space', genre:'SC-Fi',id:'2', authorId:'2'},
//     {name:'Goonies', genre:'Comedy',id:'3', authorId:'3'},

// ]

// var author = [
//     {name:'Marko Nikolic', age:'44',id:'1'},
//     {name:'Jovan Memedovic', age:'55',id:'2'},
//     {name:'Srdja Popovic', age:'3',id:'3'},
// ]
                                                                                                                                                                                                                                         
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type: GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent)
                //return _.find(author, {id:parent.authorId})
                return Author.findById(parent.authorId);
            }
        }
    })
})//We define book schema

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type: GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
              //return _.filter(books, {authorId:parent.id}) 
              return Book.find({authorId:parent.id})
            }
        }
    })
})//We define book schema

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                console.log(args.id);
                
                //return _.find(books, {id:args.id})
                //code to get data from db/other source
                return Book.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //return _.find(author,{id : args.id})
                return Author.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //return books
                return Book.find({})
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                //return authors
                return Author.find({})
            }
        }


    }
})//We here define query which expect id args and this is for BookType.

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
       addAuthor:{
           type:AuthorType,
           args:{
               name:{type:new GraphQLNonNull(GraphQLString)},
               age: { type:new GraphQLNonNull(GraphQLInt)}
           },
           resolve(parent,args){
               let author = new Author({
                   name:args.name,
                   age:args.age
               })
               return author.save();
           }
       },
       addBook:{
           type:BookType,
           args:{
               name:{type:new GraphQLNonNull(GraphQLString)},
               genre:{type:new GraphQLNonNull(GraphQLString)},
               authorId:{type:new GraphQLNonNull(GraphQLID)}
           },
           resolve(parent,args){
               let book = new Book({
                  name:args.name,
                  genre:args.genre,
                  authorId:args.authorId
               })

               return book.save()


           }
       }
    }

})


module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})// Now export this RootQuery for import in app and with we allow front end to make query.
