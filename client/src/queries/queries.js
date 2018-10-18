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

export { getAuthorQuery, getBooksQuery}