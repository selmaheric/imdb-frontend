import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, CardImg, CardBody, CardTitle, CardText, Button,
} from 'reactstrap';

import Spinner from '../components/Spinner';

import { getShows } from '../reduxStore/shows/actions';

export default function HomePage() {
  const dispatch = useDispatch();

  const { shows, loading } = useSelector((state) => state.shows);

  useEffect(() => {
    dispatch(getShows());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {
        shows.map((show) => (
          <Card className="mb-5 mt-5" key={show.id}>
            <CardImg top width="100%" src={show.cover_image} alt={show.title} />
            <CardBody>
              <CardTitle>{show.title}</CardTitle>
              <CardText>{show.description}</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        ))
      }
    </div>
  );
}
