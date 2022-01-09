import React, { useEffect, useState } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Button,
} from 'reactstrap';
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';

import { getMoreShows, getShows } from '../reduxStore/shows/actions';
import SearchInput from './SearchInput';

export default function ShowsComponent({ type }) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [byPhrase, setByPhrase] = useState(false);

  const { shows, pagination } = useSelector((state) => state.shows);

  const onLoadMore = () => {
    dispatch(getMoreShows({
      type,
      search: search && search.trim(),
      searchByPhrase: byPhrase,
    }));
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
      <SearchInput
        search={search}
        setSearch={setSearch}
        byPhrase={byPhrase}
        setByPhrase={setByPhrase}
        type={type}
      />
      <Row>
        {
        shows.map((show) => (
          <Col xs={12} md={4} lg={3} key={show.id} className="d-flex">
            <Card className="mb-5 mt-5">
              <CardImg top width="100%" src={`../assets/posters/${show.cover_image}`} alt={show.title} />
              <CardBody>
                <CardTitle><h3>{show.title}</h3></CardTitle>
                <CardText className="mt-3">
                  {`Release date: ${show.release_date}`}
                </CardText>
                <CardText className="mt-3">{show.description}</CardText>
                <StarRatings
                  rating={+show.average_rating}
                  starRatedColor="gold"
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
      {!!shows.length && pagination.totalPages !== pagination.page && (
      <Row className="mb-5">
        <Button onClick={onLoadMore}>Load More</Button>
      </Row>
      )}
    </div>
  );
}
