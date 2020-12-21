import React, { useState, useEffect } from 'react';
import { Jumbotron, Button, Container, Modal, Form, Col, Alert } from 'react-bootstrap';
import { RouteProps, useHistory } from 'react-router-dom';
import company from './../API/company';
import { isAdminOrEditor } from '../Util/validations';

type Post = {
  post_id: string
  title: string
  description: string
  date: string
}

const Posts: any = (props: RouteProps) => {
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedDescription, setSelectedDescription] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [showAlertRequired, setShowAlertRequired] = useState<boolean>(false);

  const createPost = () => {
    if(title && description){
      company.post('/posts', {
        title,
        description,
      }).then(()=> {
        setShowModalCreate(false);
        setShowAlertRequired(false);
        setLoading(true);
        setTitle(""); setDescription("");
      }).catch(() => {
        setShowModalCreate(false);
        setShowModalError(true);
        setTitle(""); setDescription("");
      });
    }
    else{
      setShowAlertRequired(true);
    }
  }

  const deletePost = () => {
    company.delete(`/posts/${selectedId}`);
    setShowModalDelete(false);
    setLoading(true);
  }

  const editPost = () => {
    if (selectedTitle && selectedDescription) {
      company.put(`/posts/${selectedId}`,{
        title: selectedTitle,
        description: selectedDescription
      }).then(()=> {
        setShowModalEdit(false);
        setShowAlertRequired(false);
        setLoading(true);
        setTitle(""); setDescription("");
      }).catch(()=> {
        setShowModalEdit(false);
        setShowModalError(true);
        setTitle(""); setDescription("");
      });
    }
    else {
      setShowAlertRequired(true);
    }
  }

  useEffect(()=> {
    company('/posts').then(({data}) => {
      setPostsData(data);
      setLoading(false);
    }).catch(()=>{
      history.push('/403');
    });
  }, [loading]);

  return !loading && (
    <Container>
      <Jumbotron style={{backgroundColor:'#5D5F59'}}>
        {isAdminOrEditor() && 
          <Button variant="secondary" onClick={()=> setShowModalCreate(true)}
          style={{ float: 'right', margin: '20px', marginTop:'20px'}}>Create New Post</Button>
        }
        <h1 style={{color:'white'}}>Welcome to our Posts!</h1>
        <p style={{color:'#C0C0C0'}}>You can find posts on varios topics. Enjoy it!</p>
        <br/>
        {
        postsData.map( (post) => (
          <Jumbotron key={post.post_id}>
            <h6 style={{float:'right'}}>Creation Date: <span style={{color:'#5D5F59'}}>{(post.date).substr(0,post.date.indexOf('T'))}</span></h6>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            {isAdminOrEditor() &&
              <p>
                <Button variant="primary" 
                  onClick={() => {setShowModalEdit(true); setSelectedId(parseInt(post.post_id)); setSelectedTitle(post.title); setSelectedDescription(post.description)}}
                >Edit</Button>{' '}
                <Button variant="danger" onClick={() => {setSelectedId(parseInt(post.post_id)); setShowModalDelete(true);}}>Delete</Button>
              </p>
            }
          </Jumbotron>
        ))
      }
      </Jumbotron>
      <Modal size="lg" show={showModalEdit} onHide={() => setShowModalEdit(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Col>
              <Form.Label>Post ID</Form.Label>
              <Form.Control placeholder="Post ID" required={true} value={selectedId} disabled={true}/><br/>
              <Form.Label>Title</Form.Label>
              <Form.Control placeholder="User Email" required={true} value={selectedTitle} 
                onChange={e=>setSelectedTitle(e.target.value)}/><br/>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Description" required={true} value={selectedDescription}
                onChange={e=>setSelectedDescription(e.target.value)}/>
            </Col>
          </Form><br/>
          { showAlertRequired && <Alert variant="warning">All fields are required.</Alert> }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> {setShowModalEdit(false); setShowAlertRequired(false);}}>Cancel</Button>
          <Button variant="primary" onClick={()=> {editPost()}}>Update</Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showModalCreate} onHide={() => setShowModalCreate(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Col>
              <Form.Label>Title</Form.Label>
              <Form.Control 
                placeholder="Title" 
                required={true}
                value={title}
                onChange={e=>setTitle(e.target.value)}              
              /><br/>
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" rows={4}
                placeholder="Description" 
                required={true}
                value={description}
                onChange={e=>setDescription(e.target.value)}
              />
            </Col>
          </Form><br/>
          { showAlertRequired && <Alert variant="warning">All fields are required.</Alert> }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> {setShowModalCreate(false); setShowAlertRequired(false);}}>Cancel</Button>
          <Button variant="primary" onClick={()=> {createPost()}}>Create Post</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalDelete} onHide={()=> setShowModalDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> setShowModalDelete(false)}>Cancel</Button>
          <Button variant="primary" onClick={()=> {deletePost()}}>Yes</Button>
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

export default Posts;