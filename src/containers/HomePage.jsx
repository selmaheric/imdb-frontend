import {
  React, useCallback, useEffect, useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, CardImg, CardBody, CardTitle, CardText, Button, Label, Input,
} from 'reactstrap';
import _ from 'lodash';

import { cancelPreviousRequest, getShows } from '../reduxStore/shows/actions';

export default function HomePage() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const { shows } = useSelector((state) => state.shows);

  const getShowsDebounced = useCallback(_.debounce((searchValue) => {
    dispatch(cancelPreviousRequest());
    dispatch(getShows({ search: searchValue }));
  }, 1000), []);

  const onInputChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value.length > 2) {
      getShowsDebounced(value);
    }
    if (value.length === 0) {
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
