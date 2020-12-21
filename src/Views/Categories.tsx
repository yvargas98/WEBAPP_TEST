import React, { useState, useEffect, FC } from 'react';
import { Container, Jumbotron, Button, Table, Modal, Form, Col } from 'react-bootstrap';
import company from './../API/company';
import { isAdminOrEditor } from '../Util/validations';

type Category = {
  category_id: string
  name: string
  description: string
}

const Categories: FC = () => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedDescription, setSelectedDescription] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  
  const [showModalError, setShowModalError] = useState<boolean>(false);

  const createCategory = () => {
    company.post('/categories', {
      name,
      description
    }).then(()=> {
      setShowModalCreate(false);
      setLoading(true);
      setName(""); setDescription("");
    }).catch(() => {
      setShowModalCreate(false);
      setShowModalError(true);
      setName(""); setDescription("");
    })
  }

  const deleteCategory = () => {
    company.delete(`/categories/${selectedId}`);
    setShowModalDelete(false);
    setLoading(true);
  }

  const editCategory = () => {
    company.put(`/categories/${selectedId}`,{
      name: selectedName,
      description: selectedDescription
    }).then(()=> {
      setShowModalEdit(false);
      setLoading(true);
      setName(""); setDescription("");
    }).catch(()=> {
      setShowModalEdit(false);
      setShowModalError(true);
      setName(""); setDescription("");
    })
  }

  useEffect(()=> {
    company('/categories').then(({data}) => {
      setCategoriesData(data);
      setLoading(false);
    });
  },[loading]);

  return (
    <Container>
      <Jumbotron style={{backgroundColor:'#5D5F59'}}>
        {isAdminOrEditor() && 
          <Button variant="secondary" onClick={()=> setShowModalCreate(true)}
          style={{ float: 'right', margin: '20px', marginTop:'20px'}}>Create New Category</Button>
        }
        <h1 style={{color:'white'}}>Welcome to Our Categories</h1><br/>
        {!loading &&
          <Table responsive striped bordered hover style={{backgroundColor:'white'}}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                {isAdminOrEditor() && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {categoriesData.map(cat => (
                <tr key={cat.category_id}>
                  <td>{cat.category_id}</td>
                  <td>{cat.name}</td>
                  <td className="wrap2">{cat.description}</td>
                  {isAdminOrEditor() &&
                  <td>
                    <p>
                      <Button variant="primary" 
                        onClick={() => {setShowModalEdit(true); setSelectedId(parseInt(cat.category_id)); setSelectedName(cat.name); setSelectedDescription(cat.description)}}
                      >Edit</Button>{' '}
                      <Button variant="danger" onClick={() => {setSelectedId(parseInt(cat.category_id)); setShowModalDelete(true);}}>Delete</Button>
                    </p>
                  </td>
                  }
                </tr>
              ))}
            </tbody>
          </Table>
        }
      </Jumbotron>
      <Modal size="lg" show={showModalEdit} onHide={() => setShowModalEdit(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Col>
              <Form.Label>Category ID</Form.Label>
              <Form.Control placeholder="Category ID" required={true} value={selectedId} disabled={true}/><br/>
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Name" required={true} value={selectedName} 
                onChange={e=>setSelectedName(e.target.value)}/><br/>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Description" required={true} value={selectedDescription}
                onChange={e=>setSelectedDescription(e.target.value)}/>
            </Col>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> setShowModalEdit(false)}>Cancel</Button>
          <Button variant="primary" onClick={()=> {editCategory()}}>Update</Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showModalCreate} onHide={() => setShowModalCreate(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Create New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Col>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                placeholder="Name" 
                required={true}
                value={name}
                onChange={e=>setName(e.target.value)}              
              /><br/>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4}
                placeholder="Description" 
                required={true}
                value={description}
                onChange={e=>setDescription(e.target.value)}
              />
            </Col>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> setShowModalCreate(false)}>Cancel</Button>
          <Button variant="primary" onClick={()=> {createCategory()}}>Create Category</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalDelete} onHide={()=> setShowModalDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> setShowModalDelete(false)}>Cancel</Button>
          <Button variant="primary" onClick={()=> {deleteCategory()}}>Yes</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalError} onHide={()=> setShowModalError(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>An error was ocurred.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> setShowModalError(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Categories;