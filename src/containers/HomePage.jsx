import {
  React, useCallback, useEffect, useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, CardImg, CardBody, CardTitle, CardText, Button, Label, Input, Row, Col,
} from 'reactstrap';
import _ from 'lodash';

import { cancelPreviousRequest, getShows } from '../reduxStore/shows/actions';

export default function HomePage() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [byPhrase, setByPhrase] = useState(false);
  const { shows } = useSelector((state) => state.shows);

  const getShowsDebounced = useCallback(_.debounce(({
    searchValue,
    searchByPhrase,
  }) => {
    dispatch(cancelPreviousRequest());
    dispatch(getShows({
      search: searchValue,
      searchByPhrase,
    }));
  }, 1000), []);

  const onInputChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value.length > 2) {
      getShowsDebounced({
        searchValue: value,
        searchByPhrase: byPhrase,
      });
    }
    if (value.length === 0) {
      getShowsDebounced({});
    }
  };

  const onCheckboxChanged = () => {
    setByPhrase(!byPhrase);
    dispatch(getShows({
      search,
      searchByPhrase: !byPhrase,
    }));
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
        Search
      </Label>
      <Input
        id="searchInput"
        name="search"
        placeholder="Forrest Gump"
        type="text"
        onChange={onInputChange}
        value={search}
      />
      <Label
        className="me-sm-2"
        for="searchInput"
      >
        Search by phrase
      </Label>
      <Input
        id="searchByPhrate"
        name="phrate"
        type="checkbox"
        onChange={onCheckboxChanged}
        checked={byPhrase}
      />
      <Row>
        {
        shows.map((show) => (
          <Col xs={12} md={4} lg={3} key={show.id}>
            <Card className="mb-5 mt-5">
              <CardImg top width="100%" src={`../assets/posters/${show.cover_image}`} alt={show.title} />
              <CardBody>
                <CardTitle>{show.title}</CardTitle>
                <CardText>{show.description}</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </Col>
        ))
      }
      </Row>

    </div>
  );
}
