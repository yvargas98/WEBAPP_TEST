import React, { useState, useEffect } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { RouteProps } from 'react-router-dom';
import company from './../API/company';

type Post = {
  post_id: string
  title: string
  description: string
}

const Posts: any = (props: RouteProps) => {
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(()=> {
    company('/posts').then(({data}) => {
      setPostsData(data);
      setLoading(false);
    });
  }, []);

  return !loading && (
    <div>
      {
        postsData.map( (post) => (
            <Jumbotron>
              <h1>{post.title}</h1>
              <p>{post.description}
              </p>
              <p>
                <Button variant="primary">Edit</Button>{' '}
                <Button variant="danger">Delete</Button>
              </p>
            </Jumbotron>
        ))
      }
    </div>
  )
}

export default Posts;