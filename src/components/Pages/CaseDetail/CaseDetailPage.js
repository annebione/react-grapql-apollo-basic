import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'
import { CASES_QUERY } from '../Cases/CasesPage'
import { Link } from 'react-router-dom'

class CaseDetailPage extends Component {
  render() {
    return (
      <Query query={ CASE_QUERY } variables={{ id: this.props.match.params.id }}>
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

          const { singleCase } = data
          const action = this._renderAction(singleCase)
          return (
            <Fragment>
              <h1 className="f3 black-80 fw4 lh-solid">{singleCase.title}</h1>
              <p className="black-80 fw3">{singleCase.description}</p>
              <p className="black-80 fw3">$ {singleCase.value}</p>
              <p className="black-80 fw3">{singleCase.court_date}</p>
              { singleCase.contacts.length > 0  ?
                singleCase.contacts.map(contact => ( 
                  <React.Fragment>
                    <h5 className="f3 black-80 fw4 lh-solid">Contacts:</h5>
                    <Link className="no-underline ma1" to={`/contacts/${contact.id}`}>
                      <p className="black-80 fw3">{contact.first_name} {contact.last_name} </p>
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
    const deleteCaseMutation = (
      <Mutation
        mutation={DELETE_CASE_MUTATION}
        update={(cache, { data }) => {
            const { cases } = cache.readQuery({ query: CASES_QUERY })
            cache.writeQuery({
              query: CASES_QUERY,
              data: {
                cases: cases.filter(cases => cases.id !== data.deleteCase.id),
              },
            })
          }
        }
      >
        {(deleteCase, { data, loading, error }) => {
          return (
            <a
              className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
              onClick={async () => {
                await deleteCase({
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
        {deleteCaseMutation}
      </Fragment>
    )
  }

}

const CASE_QUERY = gql`
    query CaseQuery($id: ID!) {
        case(id: $id) {
            id,
            title,
            description,
            value,
            court_date,
            contacts
        }
    }
  }
`

const DELETE_CASE_MUTATION = gql`
  mutation DeleteCaseMutation($id: ID!) {
    deleteCase(id: $id) {
      id
    }
  }
`

export default withRouter(CaseDetailPage)
