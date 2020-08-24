import React from 'react';
import AddClientSearch from '../../components/AddClientSearch/AddClientSearch';

export default function AddClientRoute() {
  //Route is used to call the Add Client search (which uses the Google Maps API)
  return (
    <section>
      <AddClientSearch />
    </section>
  );
}
