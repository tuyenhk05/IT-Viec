import React from 'react';
import { useParams } from 'react-router-dom';

function AplicantList() {
    const { idJob } = useParams();
  return (
      <>
          {idJob}
      </>
  );
}
export default AplicantList;