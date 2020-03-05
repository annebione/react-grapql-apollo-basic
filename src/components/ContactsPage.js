import React, { Component, Fragment } from 'react'
import Post from './Post'
import { Query } from 'react-apollo'
import  { gql } from 'apollo-boost'

export default class ContactsPage extends Component {
  render() {
    return (
      <Query query={CONTACTS_QUERY}>
        {({ data, loading, error, refetch }) => {
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
          return (
            <Fragment>
              <div className="flex justify-between items-center">
                <h1>Contacts</h1>
              </div>
              {data.contacts &&
                data.contacts.map(contact => (
                  <Post
                    key={contact.id}
                    post={contact}
                    refresh={() => refetch()}
                  />
                ))}
              {this.props.children}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export const CONTACTS_QUERY = gql`
  query ContactsQuery {
    contacts {
      id,
      first_name,
      last_name,
      case_role,
      email,
      assigned_case
    }
  }
`
