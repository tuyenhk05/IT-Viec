import React, { useState, useEffect } from 'react';
import { getallnew } from "../../services/datanew";  // Import API lấy tin tức
import { Pagination } from 'antd';
import NewsItem from './CommunityList';  // Component con để hiển thị một tin tức
import "./comunity.scss";

function CommunityAll() {
    const [newsList, setNewsList] = useState([]);
    const [newsPage, setNewsPage] = useState([]);


    // Hàm gọi API lấy tin tức khi trang được load
    useEffect(() => {
        const fetchData = async () => {
            const response = await getallnew();  // Gọi API lấy tin tức
            setNewsPage(response);
            setNewsList(response);  // Set danh sách tin tức
        }
        fetchData();
    }, []);


    // Hàm xử lý phân trang
    const handleChange = (page) => {
        const fetchData = async () => {
            const response = await getallnew(page);  // Lấy dữ liệu tin tức theo trang
            setNewsPage(response);
        }
        fetchData();
    }

    return (
        <>
            <div className="community-container">
                <h1 className="text-3xl font-bold mb-4">Trang Cộng Đồng</h1>

            
                


                <div className="news-list">
                    {newsPage.map((item, index) => (
                        <NewsItem item={item} key={index} />  // Component con để hiển thị tin tức
                    ))}
                </div>

                <Pagination defaultCurrent={1} align="center" total={newsList.length} defaultPageSize={6} onChange={handleChange} />
            </div>

            <footer className="footer">
                <div className="footer__container">
                    <p className="footer__copyright">&copy; 2025 IT-Vie. Tất cả quyền được bảo lưu.</p>
                    <div className="footer__links">
                        <a href="/" className="footer__link">Về Chúng Tôi</a>
                        <a href="/contact" className="footer__link">Liên Hệ</a>
                        <a href="/privacy" className="footer__link">Chính Sách Bảo Mật</a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default CommunityAll;
