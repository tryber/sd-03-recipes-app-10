import React from 'react';
import InProgressProvider from '../Context/InProgressProvider';
import InProgress from '../components/InProgress/inProgress';

export default function () {
  return (
    <InProgressProvider>
      <InProgress />
    </InProgressProvider>
  );
}
