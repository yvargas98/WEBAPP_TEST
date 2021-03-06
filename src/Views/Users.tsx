import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Container, Form, Jumbotron, Modal, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import company from './../API/company';

type User = {
  user_id: number
  email: string
  password: string
  role: string
}

const Users: any = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showAlertRequired, setShowAlertRequired] = useState<boolean>(false);
  
  const [showModalError, setShowModalError] = useState<boolean>(false);

  const createUser = () => {
    if(email && password && role){
      company.post('/users', {
        email,
        password,
        role
      }).then(()=> {
        setShowModalCreate(false);
        setShowAlertRequired(false);
        setLoading(true);
        setEmail(""); setPassword(""); setRole("");
      }).catch(() => {
        setShowModalCreate(false);
        setShowModalError(true);
        setEmail(""); setPassword(""); setRole("");
      });
    }
    else{
      setShowAlertRequired(true);
    }
  }

  const deleteUser = () => {
    company.delete(`/users/${selectedId}`);
    setShowModalDelete(false);
    setLoading(true);
  }

  const editUser = () => {
    if(selectedEmail && selectedRole){
      company.put(`/users/${selectedId}`,{
        email: selectedEmail,
        role: selectedRole
      }).then(()=> {
        setShowModalEdit(false);
        setShowAlertRequired(false);
        setLoading(true);
        setSelectedEmail(""); setSelectedRole("");
      }).catch(()=> {
        setShowModalEdit(false);
        setShowModalError(true);
        setSelectedEmail(""); setSelectedRole("");
      });
    }
    else{
      setShowAlertRequired(true);
    }
  }

  useEffect(()=> {
    company('/users').then(({data}) => {
      setUsersData(data);
      setLoading(false);
    }).catch(()=>{
      history.push('/403');
    });
  },[loading]);

  return !loading && (
    <Container style={{ marginTop: '30px' }}>
      <Jumbotron>
        <Button 
          variant="secondary" 
          style={{ float: 'right', margin: '20px' }}
          onClick={()=> setShowModalCreate(true)}>Add a New User</Button>
        <h1>Manage User</h1>
        <Table responsive striped bordered hover style={{backgroundColor:'white'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map(user => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.email}</td>
                <td className="wrap2">{user.password}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    onClick={() => {
                      setShowModalEdit(true);
                      setSelectedId(user.user_id);
                      setSelectedEmail(user.email);
                      setSelectedRole(user.role);
                    }}
                  >Edit</Button>{' '}
                  <Button 
                    variant="danger" 
                    onClick={() => {setSelectedId(user.user_id); setShowModalDelete(true);}}
                  >Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Jumbotron>
      <Modal size="lg" show={showModalEdit} onHide={() => setShowModalEdit(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Col>
              <Form.Label>User ID</Form.Label>
              <Form.Control placeholder="User ID" required={true} value={selectedId} disabled={true}/>
              <Form.Label>User Email</Form.Label>
              <Form.Control placeholder="User Email" required={true} value={selectedEmail} 
                onChange={e=>setSelectedEmail(e.target.value)}/>
              <Form.Label>User Role</Form.Label>
              <Form.Control as="select" required={true} defaultValue={selectedRole}
                onChange={e=>setSelectedRole(e.target.value)}>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </Form.Control>
            </Col>
          </Form><br/>
          { showAlertRequired && <Alert variant="warning">All fields are required.</Alert> }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> {setShowModalEdit(false); setShowAlertRequired(false);}}>Cancel</Button>
          <Button variant="primary" onClick={()=> {editUser()}}>Update</Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showModalCreate} onHide={() => setShowModalCreate(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Col>
              <Form.Label>User Email</Form.Label>
              <Form.Control 
                placeholder="User Email" 
                required={true}
                value={email}
                onChange={e=>setEmail(e.target.value)}              
              /><br/>
              <Form.Label>User Password</Form.Label>
              <Form.Control 
                placeholder="User Password" 
                required={true}
                value={password}
                onChange={e=>setPassword(e.target.value)}
              /><br/>
              <Form.Label>User Role</Form.Label>
              <Form.Control as="select"
                required={true}
                onChange={e=>setRole(e.target.value)}
              > 
                <option disabled selected>Choose an Option</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </Form.Control>
            </Col>
          </Form><br/>
          { showAlertRequired && <Alert variant="warning">All fields are required.</Alert> }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> {setShowModalCreate(false); setShowAlertRequired(false);}}>Cancel</Button>
          <Button variant="primary" onClick={()=> {createUser()}}>Create User</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalDelete} onHide={()=> setShowModalDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> setShowModalDelete(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=> {deleteUser()}}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalError} onHide={()=> setShowModalError(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>An error was ocurred.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> setShowModalError(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Users;