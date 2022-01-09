import React, { useCallback, useEffect } from 'react';
import { Label, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { cancelPreviousRequest, getShows } from '../reduxStore/shows/actions';

export default function SearchInput({
  type,
  search,
  byPhrase,
  setSearch,
  setByPhrase,
}) {
  const dispatch = useDispatch();

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
  }, 500), [type]);

  const onInputChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value.length > 2) {
      getShowsDebounced({
        type,
        searchValue: value.trim(),
        searchByPhrase: byPhrase,
      });
    }
    if (value.length === 0) {
      getShowsDebounced({});
    }
  };

  const onCheckboxChanged = () => {
    setByPhrase(!byPhrase);
    if (search.length > 2) {
      dispatch(getShows({
        type,
        search: search.trim(),
        searchByPhrase: !byPhrase,
      }));
    }
  };

  useEffect(() => {
    setSearch('');
    setByPhrase(false);
  }, [type]);

  return (
    <div>
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
          placeholder={type === 'movie' ? 'Forrest Gump' : 'Friends'}
          type="text"
          onChange={onInputChange}
          value={search}
        />
      </div>
      <div className="pt-2">
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
    </div>
  );
}
