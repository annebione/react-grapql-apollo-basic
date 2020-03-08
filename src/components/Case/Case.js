import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Case extends Component {
  render() {
    let title = this.props.case.title;
    let description = this.props.case.description;
    let value = this.props.case.value;
    let court_date = this.props.case.court_date;
    let contacts = this.props.case.contacts;

    return (
      <React.Fragment>
        <Link className="no-underline ma1" to={`/cases/${this.props.id}`}>
          <h2 className="f3 black-80 fw4 lh-solid">{title}</h2>
        </Link>
        <p className="f3 black-80 fw4 lh-solid">{description}</p>
        <p className="f3 black-80 fw4 lh-solid">$ {value}</p>
        <p className="f3 black-80 fw4 lh-solid">Court Date: {court_date}</p>
        { contacts.length > 0  ?
            contacts.map(contact => ( 
              <React.Fragment>
                <h5 className="f3 black-80 fw4 lh-solid">Contacts:</h5>
                <p className="f3 black-80 fw4 lh-solid">{contact.first_name} </p>
                <p className="f3 black-80 fw4 lh-solid">{contact.last_name}</p>
                <p className="f3 black-80 fw4 lh-solid">{contact.email}</p>
                <p className="f3 black-80 fw4 lh-solid">{contact.case_role}</p>
              </React.Fragment>
            ))
        : null }
      </React.Fragment>
    )
  }
}