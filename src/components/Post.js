import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Post extends Component {
  render() {
    let title = this.props.post.title
    if (this.props.isDraft) {
      title = `${title} (Draft)`
    }

    return (
      <Link className="no-underline ma1" to={`/cases/${this.props.post.id}`}>
        <h2 className="f3 black-80 fw4 lh-solid">{title}</h2>
      </Link>
    )
  }
}
