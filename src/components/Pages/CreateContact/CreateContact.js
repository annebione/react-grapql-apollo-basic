import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { CONTACTS_QUERY } from '../Contacts/ContactsPage'

class CreateContact extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    assignedCase: [],
    caseRole: ''
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_CONTACT_MUTATION}
        update={(cache, { data }) => {
          const { contacts } = cache.readQuery({ query: CONTACTS_QUERY })
          cache.writeQuery({
            query: CONTACTS_QUERY,
            data: { contacts: contacts.concat([data.CreateContact]) },
          })
        }}
      >
      
        {(CreateContact, { data, loading, error }) => {
          return (
            <div className="pa4 flex justify-center bg-white">
              <form
                onSubmit={async e => {
                  e.preventDefault()
                  const { firstName,
                  lastName,
                  email,
                  assignedCase,
                  caseRole } = this.state
                  await CreateContact({
                    variables: { firstName,
                      lastName,
                      email,
                      assignedCase,
                      caseRole },
                  })
                  this.props.history.replace('/')
                }}
              >
                <h1>Create Contact</h1>
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ firstName: e.target.value })}
                  placeholder="First Name"
                  type="text"
                  value={this.state.firstName}
                />
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ lastName: e.target.value })}
                  placeholder="Last Name"
                  type="text"
                  value={this.state.lastName}
                />
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ email: e.target.value })}
                  placeholder="Email"
                  type="email"
                  value={this.state.email}
                />
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ assignedCase: e.target.value })}
                  placeholder="Assigned Case"
                  type="text"
                  value={this.state.assignedCase}
                />
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ caseRole: e.target.value })}
                  placeholder="Case Role"
                  type="text"
                  value={this.state.caseRole}
                />
                <input
                  className={`pa3 bg-black-10 bn ${this.state.firstName &&
                    this.state.lastName &&
                    'dim pointer'}`}
                  disabled={
                    !this.state.firstName ||
                    !this.state.lastName ||
                    !this.state.email ||
                    !this.state.caseRole
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

const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContactMutation(
    $firstName: String!, 
    $lastName: String!,
    $email: String!,
    $assignedCase: Object!,
    $caseRole: String!,
  ) {
      CreateContact(firstName: $firstName,
        lastName: $lastName,
        email: $email,
        assignedCase: $assignedCase,
        caseRole: $caseRole
      ) {
          id
          firstName,
          lastName,
          email,
          assignedCase,
          caseRole
        }
    }
  `

export default withRouter(CreateContact)
