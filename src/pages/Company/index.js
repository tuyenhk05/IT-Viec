import React, { useState, useEffect } from 'react';
import { getallcompany } from '../../services/datacompany'; // Adjust the import path as necessary
import './Company.scss'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom'; 
import { Spin, Flex } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
function Company() {
    const [company, setCompany] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await getallcompany();
               
                setCompany(response);
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };
        fetchCompany();
       
    }, []);
    const handleClick = (id) => () => {
        navigate(`/company/${id}`);
    }
    return (
        <>
            {
                company.length === 0 ? (<>
                    <Flex align="center" gap="middle" className="fullscreen-spin">
                        <Spin indicator={<LoadingOutlined spin />} size="large" />
                    </Flex>
                    </>

                ) : (
                    <>
                     <div className="company">
            <div className="company__content">
              <h2>  Công ty IT tốt nhất Việt Nam 2025</h2>
               <p> Top 30 công ty IT tốt nhất Việt Nam sau đây (15 doanh nghiệp Lớn, 15 doanh nghiệp Vừa và Nhỏ) được ghi nhận mang đến văn hóa doanh nghiệp, phúc lợi, môi trường làm việc, sự quan tâm đến nhân viên và đào tạo xuất sắc nhất trong số 11,000+ công ty IT trên ITviec.
                Các chỉ số xếp hạng này được tổng hợp dựa trên đánh giá của nhân viên IT tại Việt Nam trong giai đoạn từ 01/01/2024 đến 31/12/2024, không phải điểm đánh giá tích lũy từ trước đến nay của các công ty đạt giải. Vui lòng xem FAQ để hiểu rõ hơn về cách tính và xếp hạng.
                    </p>
                </div>
                <div className="company__list">
                    {company.map((item, index) => (
                        <div className="company__item" key={index} onClick={handleClick(item.id) }>
                           
                            <h3>{item.companyName}</h3>
                            <p className="company__item--mota">{item.description}</p>
                            <p className="company__item--address">{item.address}</p>

                        </div>
                    ))}
                </div>
            </div>
            <footer className="footer">
                <div className="footer__container ">
                    <p className="footer__copyright">&copy; 2025 IT-Vie. Tất cả quyền được bảo lưu.</p>
                    <div className="footer__links ">
                        <a href="/" className="footer__link ">Về Chúng Tôi</a>
                        <a href="/contact" className="footer__link ">Liên Hệ</a>
                        <a href="/privacy" className="footer__link ">Chính Sách Bảo Mật</a>
                    </div>
                </div>
                            </footer>
            </>
                )
            }
       
        </>
    );
}
export default Company;