import {gql} from 'apollo-boost';

const getAuthorQuery = gql`
  {
    authors{
      name
      id
    }
  }


`

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }



`
const addBookMutation = gql`
mutation($name:String!, $genre:String!, $authorId:ID!) {
   addBook(name:$name, genre:$genre, authorId:$authorId){
       name
       id
   }
}
`

export { getAuthorQuery, getBooksQuery, addBookMutation}