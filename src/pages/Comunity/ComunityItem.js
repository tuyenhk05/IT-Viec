// NewsItem.js
import React from 'react';
import { useParams } from 'react-router-dom'; 

function NewsItem() {
    const { comunityId } = useParams(); // Lấy tham số từ URL
  
    return (
        <>
            đây là trang {comunityId} chi tiết 
        </>
    );
}

export default NewsItem;
