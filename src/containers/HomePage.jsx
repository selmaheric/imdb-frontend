import { React, useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import ShowsComponent from '../components/ShowsComponent';

export default function HomePage() {
  const [type, setType] = useState('movie');

  return (
    <div className="mt-5">
      <Nav tabs>
        <NavItem>
          <NavLink
            href="#"
            className={type === 'movie' ? 'active' : ''}
            onClick={() => setType('movie')}
          >
            Movies
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="#"
            className={type === 'tv_show' ? 'active' : ''}
            onClick={() => setType('tv_show')}
          >
            TV Shows
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={type}>
        <TabPane tabId="movie">
          <ShowsComponent type={type} />
        </TabPane>
        <TabPane tabId="tv_show">
          <ShowsComponent type={type} />
        </TabPane>
      </TabContent>
    </div>
  );
}
