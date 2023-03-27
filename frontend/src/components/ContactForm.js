import React, { Component } from "react";
import axios from "axios";
import { url } from "../features/api";
import '../styles/contactForm.css'
class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      subject: "",
      status: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, message, subject } = this.state;
    axios
      .post(`${url}/send`, { name, email, message, subject })
      .then((response) => {
        console.log(response.data);
        this.setState({ status: "Email sent successfully" });
        this.resetForm();
      })
      .catch((error) => {
        console.log(error);
        this.setState({ status: "Error sending email" });
      });
  };
  resetForm() {
    this.setState({ name: "", email: "", subject: "", message: "" });
  }

  render() {
    const { name, email, message, status, subject } = this.state;
    return (
      <div className="formContainer">
        
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleInputChange}
              className='formInput'
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
              className='formInput'
            />
            <label htmlFor="subject">Asunto:</label>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={this.handleInputChange}
              className='formInput'
            />
            <label htmlFor="message">Mensaje:</label>
            <textarea
              name="message"
              value={message}
              onChange={this.handleInputChange}
              className='formInput'
            />
          <button type="submit" className='formButton'>Submit</button>
        </form>
        {status && <div>{status}</div>}
      </div>
    );
  }
}

export default ContactForm;
