import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, CardImg, CardBody, CardTitle, CardText, Button, Label, Input,
} from 'reactstrap';
import _ from 'lodash';

import { getShows } from '../reduxStore/shows/actions';

export default function HomePage() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const { shows } = useSelector((state) => state.shows);

  const getShowsDebounced = _.debounce(() => {
    dispatch(getShows({ search }));
  }, [1000]);

  const onInputChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 2) {
      getShowsDebounced();
    }
  };

  useEffect(() => {
    dispatch(getShows());
  }, []);

  return (
    <div className="mt-5">
      <Label
        className="me-sm-2"
        for="searchInput"
      >
        Search by show or by phrase
      </Label>
      <Input
        id="searchInput"
        name="search"
        placeholder="Forrest Gump"
        type="text"
        onChange={onInputChange}
        value={search}
      />

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
