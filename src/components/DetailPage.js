import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'
import { CONTACTS_QUERY } from './ContactsPage'
import { CASES_QUERY } from './CasesPage'

class DetailPage extends Component {
  render() {
    return (
      <Query query={POST_QUERY} variables={{ id: this.props.match.params.id }}>
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

          const { post } = data
          const action = this._renderAction(post)
          return (
            <Fragment>
              <h1 className="f3 black-80 fw4 lh-solid">{data.post.title}</h1>
              <p className="black-80 fw3">{data.post.content}</p>
              {action}
            </Fragment>
          )
        }}
      </Query>
    )
  }

  _renderAction = ({ id, published }) => {
    const publishMutation = (
      <Mutation
        mutation={PUBLISH_MUTATION}
        update={(cache, { data }) => {
          const { contacts } = cache.readQuery({ query: CONTACTS_QUERY })
          const { cases } = cache.readQuery({ query: CASES_QUERY })
          cache.writeQuery({
            query: CASES_QUERY,
            data: { cases: cases.concat([data.publish]) },
          })
          cache.writeQuery({
            query: CONTACTS_QUERY,
            data: {
              contacts: contacts.filter(contact => contact.id !== data.publish.id),
            },
          })
        }}
      >
        {(publish, { data, loading, error }) => {
          return (
            <a
              className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
              onClick={async () => {
                await publish({
                  variables: { id },
                })
                this.props.history.replace('/')
              }}
            >
              Publish
            </a>
          )
        }}
      </Mutation>
    )
    const deleteMutation = (
      <Mutation
        mutation={DELETE_MUTATION}
        update={(cache, { data }) => {
          if (published) {
            const { contacts } = cache.readQuery({ query: CASES_QUERY })
            cache.writeQuery({
              query: CASES_QUERY,
              data: {
                cases: cases.filter(singleCase => singleCase.id !== data.deletePost.id),
              },
            })
          } else {
            const { drafts } = cache.readQuery({ query: CONTACTS_QUERY })
            cache.writeQuery({
              query: CONTACTS_QUERY,
              data: {
                contacts: contacts.filter(contacts => contacts.id !== data.deletePost.id),
              },
            })
          }
        }}
      >
        {(deletePost, { data, loading, error }) => {
          return (
            <a
              className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
              onClick={async () => {
                await deletePost({
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
        {publishMutation}
        {deleteMutation}
      </Fragment>
    )
  }

}

const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      content
      published
    }
  }
`

const PUBLISH_MUTATION = gql`
  mutation PublishMutation($id: ID!) {
    publish(id: $id) {
      id
      published
    }
  }
`

const DELETE_MUTATION = gql`
  mutation DeleteMutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

export default withRouter(DetailPage)
