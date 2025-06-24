// NewsItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NewsItem({ item }) {
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
    const handleClick = () => {
        navigate(`/comunity/${item.id}`); // Điều hướng đến trang chi tiết tin tức
    }
    return (
        <div className="news-item">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="text-lg">{item.description}</p>
            <div className="content-text">{item.content}</div>
            <span>Đăng bởi: {item.author} | Ngày đăng: {item.date_posted}</span>
            <div className="click" onClick={handleClick}> Xem thêm</div>
        </div>
    );
}

export default NewsItem;
