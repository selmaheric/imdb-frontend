import React, { useCallback, useState } from 'react';
import { Label, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { cancelPreviousRequest, getShows } from '../reduxStore/shows/actions';

export default function SearchInput({ type }) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [byPhrase, setByPhrase] = useState(false);

  const getShowsDebounced = useCallback(_.debounce(({
    searchValue,
    searchByPhrase,
  }) => {
    dispatch(cancelPreviousRequest());
    dispatch(getShows({
      type,
      search: searchValue,
      searchByPhrase,
    }));
  }, 1000), []);

  const onInputChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value.length > 2) {
      getShowsDebounced({
        type,
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
      type,
      search,
      searchByPhrase: !byPhrase,
    }));
  };

  return (
    <div>
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
    </div>
  );
}
