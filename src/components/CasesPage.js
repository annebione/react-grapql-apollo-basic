import React, { Component, Fragment } from 'react'
import Post from './Post'
import { Query } from 'react-apollo'
import  { gql } from 'apollo-boost'

export default class CasesPage extends Component {
  render() {
    return (
      <Query query={CASES_QUERY}>
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
              <h1>?Case List</h1>
              {data.cases &&
                data.cases.map(singleCase => (
                  <Post
                    key={singleCase.id}
                    post={singleCase}
                    refresh={() => refetch()}
                  />
                )) }
              {this.props.children}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export const CASES_QUERY = gql`
  query CasesQuery {
    cases {
      id,
      title,
      description,
      value,
      court_date,
      contacts
    }
  }
`
