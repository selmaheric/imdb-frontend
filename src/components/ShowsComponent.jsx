import React, { useEffect } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';

import { addRating, getShows } from '../reduxStore/shows/actions';
import SearchInput from './SearchInput';

export default function ShowsComponent({ type }) {
  const dispatch = useDispatch();

  const { shows } = useSelector((state) => state.shows);
  const { user } = useSelector((state) => state.auth);

  const onRatingChanged = (id, rating) => {
    if (user) {
      dispatch(addRating({ id, rating }));
    } else {
      window.alert('If you want to rate a movie or a tv show please login first!');
    }
  };

  useEffect(() => {
    dispatch(getShows({ type }));
  }, [type]);

  return (
    <div
      className="pt-3 px-5 w-100 h-100 bg-white"
      style={{
        borderLeft: '1px solid #dee2e6',
        borderRight: '1px solid #dee2e6',
        borderBottom: '1px solid #dee2e6',
      }}
    >
      <SearchInput type={type} />
      <Row>
        {
        shows.map((show) => (
          <Col xs={12} md={4} lg={3} key={show.id} className="d-flex">
            <Card className="mb-5 mt-5">
              <CardImg top width="100%" src={`../assets/posters/${show.cover_image}`} alt={show.title} />
              <CardBody>
                <CardTitle><h3>{show.title}</h3></CardTitle>
                <CardText className="mt-3">{show.description}</CardText>
                <StarRatings
                  rating={+show.my_rating || +show.average_rating}
                  starRatedColor={show.my_rating ? 'red' : 'gold'}
                  changeRating={(value) => onRatingChanged(show.id, value)}
                  numberOfStars={5}
                  name="rating"
                  starDimension="30px"
                  starSpacing="3px"

                />
              </CardBody>
            </Card>
          </Col>
        ))
      }
      </Row>
    </div>
  );
}
