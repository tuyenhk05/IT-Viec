// NewsItem.js
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getnew } from '../../services/datanew'; // giả sử bạn có API này
import { Spin, Flex } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './comunity.scss';

function NewsItem() {
    const { comunityId } = useParams(); // Lấy tham số từ URL
    const navigate = useNavigate(); // Hook để điều hướng
   

        const [news, setNews] = useState(null);

        useEffect(() => {
            const fetchNews = async () => {
                const res = await getnew(comunityId);  // Gọi API chi tiết
                setNews(res);
            };
            fetchNews();
        }, [comunityId]);

    if (!news) return <> <Flex align="center" gap="middle" className="fullscreen-spin">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
    </Flex></>;

    return (

       <>
            <div className="community-detail-container">
                <div className="btn-back" onClick={() => { navigate(-1) }}>← Quay lại</div>
                <br />
                <h1 className="text-3xl font-bold mb-2">{news.title}</h1>

                <div className="text-sm text-gray-500 mb-2">
                    <span>Ngày đăng: {new Date(news.date_posted).toLocaleDateString()}</span> |
                    <span> Tác giả: {news.author}</span>
                </div>

                <div className="text-base text-gray-700 mb-4">{news.description}</div>

                <div className="content mb-6">
                    <p>{news.content}</p>
                </div>

                <div className="tags flex gap-2 flex-wrap">
                    {news.tags.map((tag, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </>
        );
    

    

}

export default NewsItem;
