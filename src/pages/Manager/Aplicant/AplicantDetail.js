import React from 'react';
import { useParams } from 'react-router-dom'; 

function AplicantDetail() {
    const { aplicantId } = useParams(); 
  return (
      <>
          {aplicantId}

      </>
  );
}
export default AplicantDetail;