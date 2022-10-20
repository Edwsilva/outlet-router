import * as React from 'react';

import {
  useLocation,
  NavLink,
  Outlet,
  useSearchParams,
} from 'react-router-dom';
import { getInvoices } from '../data';

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  // localhost:3000/user/anil?country=in
  // location {hash:"" key:"default" pathname: "user/anil" search: "?country=in"}
  console.log("LOCATION ", location)
  return <NavLink to={to} {...props} />;
}

export default function Invoices() {
  let location = useLocation();
  console.log("LOCATION INVOICES ", location.state)
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams({ replace: true });
  console.log("SEARCH PARAMS ", searchParams.get('filter'))

  return (
    <>
    {/* {location.state.name === "Edwilson" ?  */}
    <div style={{ display: 'flex' }}>
      <nav style={{ borderRight: 'solid 1px', padding: '1rem' }}>
        <input
          value={searchParams.get('filter') || ''}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter }, { replace: true });
            } else {
              setSearchParams({}, { replace: true });
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get('filter');
            console.log("FILTER ", filter)
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
             <QueryNavLink 
              // or NavLink 
              // <NavLink 
              key={invoice.number}
              style={({ isActive }) => {
                console.log("Cliquei no invoice")
                return {
                  display: 'block',
                  margin: '1rem 0',
                  color: isActive ? 'red' : 'green',
                };
              }}
              to={`/invoices/${invoice.number}`}
            >
              {invoice.name}
              </QueryNavLink>
            //  </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
     {/* : null */}
    </>
  );
}

