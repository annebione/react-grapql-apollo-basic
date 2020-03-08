import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Contact extends Component {
  render() {
    let firstName = this.props.first_name;
    let lastName = this.props.last_name;
    let caseRole = this.props.case_role;
    let email  = this.props.email;
    let cases = this.props.cases;

    return (
      <React.Fragment>
        <Link className="no-underline ma1" to={`/contact/${this.props.id}`}>
          <h2 className="f3 black-80 fw4 lh-solid">{firstName} {lastName}</h2>
        </Link>
        <p className="f3 black-80 fw4 lh-solid">{caseRole}</p>
        <p className="f3 black-80 fw4 lh-solid">Contact: {email}</p>
        { cases.length > 0  ?
            cases.map(singleCase => ( 
              <React.Fragment>
                <h5 className="f3 black-80 fw4 lh-solid">Cases:</h5>
                <Link className="no-underline ma1" to={`/cases/${singleCase.id}`}>
                    <p className="f3 black-80 fw4 lh-solid">{singleCase.title} </p>
                </Link>
              </React.Fragment>
            ))
        : null }
      </React.Fragment>
    )
  }
}