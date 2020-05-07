import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, ListGroupItemText, ListGroupItemHeading, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
const apiUrl = 'http://localhost:5000/api/students';

class StudentList extends Component {
  state = {
    students: [],
    name: '',
    email: '',
    street: '',
    zipCode: '',
    city: ''

  }

  //kör renderStudentList som renderar studentlistan
  componentDidMount() {
    this.renderStudentList();
  }

  // handle change på inputs
  handleChange(event) {
    if (event.target.name === 'name') {
      this.setState({ name: event.target.value });
    }
    if (event.target.name === 'email') {
      this.setState({ email: event.target.value });
    }
    if (event.target.name === 'street') {
      this.setState({ street: event.target.value });
    }
    if (event.target.name === 'zipCode') {
      this.setState({ zipCode: event.target.value });
    }
    if (event.target.name === 'city') {
      this.setState({ city: event.target.value });
    }
  }
  // handle submit, skapar ett object som sen skickas med POST till API't
  // för att sen rendera listan på nytt och tömma inputsen.
  handleSubmit() {
    const { name, email, street, zipCode, city } = this.state;
    const studentData = {
      student: {
        name,
        email,
        address: {
          street,
          zipCode,
          city,
        }
      }
    }
    axios({
      method: 'post',
      url: apiUrl,
      data: studentData
    })
      .then(data => {
        this.renderStudentList();
        this.setState({ name: '', email: '', street: '', zipCode: '', city: '' })
      })
      .catch(err => console.log(err))
  }

  renderStudentList() {
    axios.get(apiUrl)
      .then(res => {
        const students = res.data;
        this.setState({ students });
      })
  }

  render() {
    const { students, name, email, street, zipCode, city } = this.state;
    return (
      <Container>
        <ListGroup>
          {students.map(({ student, _id }) => (
            <ListGroupItem key={_id}>
              <ListGroupItemHeading>{student.name}</ListGroupItemHeading>
              <ListGroupItemText className='mt-0 mb-0'>{student.email}</ListGroupItemText>
              <ListGroupItemText className='mt-0 mb-0'>{student.address.street}</ListGroupItemText>
              <ListGroupItemText className='mt-0 mb-0'> {student.address.zipCode}</ListGroupItemText>
              <ListGroupItemText className='mt-0 mb-0'>{student.address.city}</ListGroupItemText>
              <Button
                color="danger"
                size='sm'
                className='mt-2'
                onClick={() => {
                  axios.delete(`${apiUrl}/${_id}`);
                  this.setState(state => ({
                    students: state.students.filter(student => student._id !== _id)
                  }));

                }}
              >Delete</Button>
            </ListGroupItem>
          ))}
          <ListGroupItem>
            <ListGroupItemHeading>
              Add a student
            </ListGroupItemHeading>
            <hr />
            <Form>
              <FormGroup>
                <Label for="nameInput">Name</Label>
                <Input type="text" name="name" id="nameInput" placeholder="Enter your name.." value={name} onChange={this.handleChange.bind(this)} />
                <Label for="emailInput">Email</Label>
                <Input type="email" name="email" id="emailInput" placeholder="Enter your email.." value={email} onChange={this.handleChange.bind(this)} />
              </FormGroup>
              <hr />
              <FormGroup>
                <Label for="streetInput">Street</Label>
                <Input type="text" name="street" id="streetInput" value={street} onChange={this.handleChange.bind(this)} />
                <Label for="zipCodeInput">Zipcode</Label>
                <Input type="text" name="zipCode" id="zipCodeInput" value={zipCode} onChange={this.handleChange.bind(this)} />
                <Label for="cityInput">City</Label>
                <Input type="text" name="city" id="cityInput" value={city} onChange={this.handleChange.bind(this)} />
              </FormGroup>
              <Button
                color="success"
                size='sm'
                className='mt-2'
                onClick={this.handleSubmit.bind(this)
                }
              >Add</Button>
            </Form>
          </ListGroupItem>
        </ListGroup>
      </Container >
    )
  }
}

export default StudentList;