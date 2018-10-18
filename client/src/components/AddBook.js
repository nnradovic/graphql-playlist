import React, { Component } from 'react';
import { graphql } from 'react-apollo'

import {getAuthorQuery} from '../queries/queries'



class AddBook extends Component {
    
    displayAuthors(){
        var data = this.props.data

        if(data.loading){
            return(<option disabled>Loading authors...</option>)
        }else{
            return data.authors.map(author=>{
                return(<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    render() {
        return (
            <form id="add-book">
                <div className="field">
                    <label>Book Name:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" />
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select>
                        <option disabled>Select Authors</option>
                        {this.displayAuthors()}
                    </select>

                    <button>+</button>
                </div>
            </form>
        )
    }
}

export default graphql(getAuthorQuery)(AddBook) 