import React, { useState } from 'react'
import { Container, Form, Col, Button, Modal } from 'react-bootstrap';
import company from '../../API/company'

const CreateUser: any = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const createUser = () => {
    company.post('/users', {
      email,
      password,
      role
    }).then(()=> {
      setShowModal(true);
      setEmail(""); setPassword(""); setRole("");
    }).catch(() => {
      setShowModal2(true);
      setEmail(""); setPassword(""); setRole("");
    })
  }
  return (
    <Container style={{ marginTop: '100px' }}>
      <h1>Add User</h1>
      <Form style={{ margin: '50px' }}>
        <Form.Row>
          <Col>
            <Form.Control 
              placeholder="User Email" 
              required={true}
              value={email}
              onChange={e=>setEmail(e.target.value)}              
            />
          </Col>
          <Col>
            <Form.Control 
              placeholder="User Password" 
              required={true}
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control 
              placeholder="User Role" 
              required={true}
              value={role}
              onChange={e=>setRole(e.target.value)}
            />
          </Col>
        </Form.Row>
        <Button style={{ margin: '30px', float: 'right' }} onClick={createUser}>Add User</Button>
      </Form>
      <Modal show={showModal} onHide={()=> setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Created Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have created a user.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal2} onHide={()=> setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Wot Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>User Already Exist.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> setShowModal2(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
};

export default CreateUser;