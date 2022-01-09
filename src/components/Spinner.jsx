import React from 'react';
import { Spinner } from 'reactstrap';

export default function SpinnerComponent() {
  return (
    <div className="d-flex align-items-center justify-content-center h-50">
      <Spinner style={{ width: '3rem', height: '3rem' }} />
    </div>
  );
}
