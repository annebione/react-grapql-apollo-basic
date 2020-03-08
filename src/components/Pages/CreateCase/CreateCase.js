import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation} from 'react-apollo'
import  { gql } from 'apollo-boost'
import { CASES_QUERY } from '../Cases/CasesPage'
import { CONTACTS_QUERY } from '../Contacts/ContactsPage';

class CreateCase extends Component {
  state = {
    title: '',
    description: '',
    courtDate : '',
    value: 0,
    contacts: []
  }

  render() {

    return (
      <Mutation
        mutation={CREATE_CASE_MUTATION}
        update={(cache, { data }) => {
          const { cases } = cache.readQuery({ query: CASES_QUERY })
          const { contacts } = cache.readQuery({ query: CONTACTS_QUERY })
          cache.writeQuery({
            query: CASES_QUERY,
            data: { cases: cases.concat([data.CreateCase]) },
          })
        }}
      >
      
        {(CreateCase, { data, loading, error }) => {
          return (
            <div className="pa4 flex justify-center bg-white">
              <form
                onSubmit={async e => {
                  e.preventDefault()
                  const {
                    title,
                    description,
                    courtDate,
                    value,
                    contacts } = this.state
                  await CreateCase({
                    variables: {
                      title,
                      description,
                      courtDate,
                      value,
                      contacts },
                  })
                  this.props.history.replace('/')
                }}
              >
                <h1>Create Case</h1>
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ title: e.target.value })}
                  placeholder="Title"
                  type="text"
                  value={this.state.title}
                />
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ description: e.target.value })}
                  placeholder="Description"
                  type="text"
                  value={this.state.description}
                />
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ value: e.target.value })}
                  placeholder="Value"
                  type="text"
                  value={this.state.value}
                />
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ courtDate: e.target.value })}
                  placeholder="Court date"
                  type="text"
                  value={this.state.courtDate}
                />
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ contacts: e.target.value })}
                  placeholder="contacts"
                  type="text"
                  value={this.state.contacts}
                />
                <input
                  className={`pa3 bg-black-10 bn ${this.state.title &&
                    this.state.description &&
                    'dim pointer'}`}
                  disabled={
                    !this.state.title ||
                    !this.state.description ||
                    !this.state.courtDate ||
                    !this.state.value
                  }
                  type="submit"
                  value="Create"
                />

                <a className="pa3 bg-black-10 bn dim pointer" onClick={this.props.history.goBack}>
                  Cancel
                </a>
              </form>
            </div>
          )
        }}
      </Mutation>
    )
  }

}

const CREATE_CASE_MUTATION = gql`
  mutation CreateCaseMutation(
    $title: String!, 
    $description: String!,
    $value: String!,
    $courtDate: Object!,
    $contacts: String!,
  ) {
      CreateCase(title: $title,
        description: $description,
        value: $value,
        courtDate: $courtDate,
        contacts: $contacts
      ) {
          id
          title,
          description,
          court_date,
          value,
          contacts
        }
    }
  `

export default withRouter(CreateCase)