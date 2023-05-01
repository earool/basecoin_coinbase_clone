import React from 'react';
import { useLoaderData } from 'react-router-dom';

import Main from '../../components/protected/home/Main';

function HomePage() {
  const data = useLoaderData();
  return <Main data={data} />;
}

export default HomePage;
