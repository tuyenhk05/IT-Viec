import React, { useState, useEffect } from 'react';
import { getallnew } from "../../services/datanew";
import { Pagination } from 'antd';
import NewsItem from './CommunityList';
import "./comunity.scss";

function CommunityAll() {
    const [newsList, setNewsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        const fetchData = async () => {
            const response = await getallnew();  // Lấy tất cả dữ liệu
            setNewsList(response);
        }
        fetchData();
    }, []);

    // Tính toán các phần tử cho trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const newsPage = newsList.slice(startIndex, endIndex);

    return (
        <>
            <div className="community-container">
                <h1 className="text-3xl font-bold mb-4" style={{margin:20} }>Trang Cộng Đồng</h1>

                <div className="news-list">
                    {newsPage.map((item, index) => (
                        <NewsItem item={item} key={index} />
                    ))}
                </div>

                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={newsList.length}
                    onChange={(page) => setCurrentPage(page)}
                    style={{ textAlign: 'center', marginTop: '20px' }}
                />
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
