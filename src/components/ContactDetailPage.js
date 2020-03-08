import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'
import { CONTACTS_QUERY } from './ContactsPage'

class ContactDetailPage extends Component {
  render() {
    return (
      <Query query={ CONTACT_QUERY } variables={{ id: this.props.match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading ...</div>
              </div>
            )
          }

          if (error) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>An unexpected error occured.</div>
              </div>
            )
          }

          const { contact } = data
          const action = this._renderAction(contact)
          return (
            <Fragment>
              <h1 className="f3 black-80 fw4 lh-solid">{contact.first_name} {contact.last_name}</h1>
              <p className="black-80 fw3">{contact.case_role}</p>
              <p className="black-80 fw3">Contact: {contact.email}</p>
              { contact.assigned_case.length > 0  ?
                contact.assigned_case.map(singleCase => ( 
                  <React.Fragment>
                    <h5 className="f3 black-80 fw4 lh-solid">Cases:</h5>
                    <Link className="no-underline ma1" to={`/cases/${singleCase.id}`}>
                      <p className="black-80 fw3">{singleCase.title} </p>
                    </Link>
                  </React.Fragment>
                ))
                : null }
              {action}
            </Fragment>
          )
        }}
      </Query>
    )
  }

  _renderAction = ({ id, published }) => {
    const deleteContactMutation = (
      <Mutation
        mutation={DELETE_CONTACT_MUTATION}
        update={(cache, { data }) => {
            const { contacts } = cache.readQuery({ query: CONTACTS_QUERY })
            cache.writeQuery({
              query: CONTACTS_QUERY,
              data: {
                contacts: contacts.filter(contacts => contacts.id !== data.deleteContact.id),
              },
            })
          }
        }
      >
        {(deleteContact, { data, loading, error }) => {
          return (
            <a
              className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
              onClick={async () => {
                await deleteContact({
                  variables: { id },
                })
                this.props.history.replace('/')
              }}
            >
              Delete
            </a>
          )
        }}
      </Mutation>
    )
    return (
      <Fragment>
        {deleteContactMutation}
      </Fragment>
    )
  }

}

const CONTACT_QUERY = gql`
  query ContactQuery($id: ID!) {
    contact(id: $id) {
      id,
      first_name,
      last_name,
      case_role,
      email,
      assigned_case
    }
  }
`

const DELETE_CONTACT_MUTATION = gql`
  mutation DeleteContactMutation($id: ID!) {
    deleteContact(id: $id) {
      id
    }
  }
`

export default withRouter(ContactDetailPage)
