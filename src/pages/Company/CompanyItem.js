import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getcompany } from '../../services/datacompany'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom'; 
import { Spin, Flex } from 'antd'; 
import { LoadingOutlined } from '@ant-design/icons';

function CompanyItem() {
    const { companyId } = useParams();
    const [company, setCompany] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await getcompany(companyId); // Replace with your actual API endpoint
                console.log(response);
                setCompany(response);
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };
        fetchCompany();
    }, [companyId]);
    return (
        <>
            {
                company.companyName ? (<>
                    <div className="company-item">
                <div className="btn-back" onClick={() => { navigate(-1) }}>← Quay lại</div>
                <br />


                <div className="company-item__header">
                    <h2>{company.companyName}</h2>
                    <p className="company-item__address">{company.address}</p>
                    <p className="company-item__description">{company.description}</p>
                </div>

                <div className="company-item__details">
                    <h3>Thông tin chi tiết</h3>
                    <p><strong>Website:</strong> {company.website}</p>
                    <p><strong>Số điện thoại:</strong> {company.phone}</p>
                    <p><strong>Email:</strong> {company.email}</p>
                    <p><strong>Thời gian hoạt động : </strong> {company.workingTime}</p>
                    <p><strong>Quy mô công ty:</strong> {company.quantityPeople} thành viên</p>
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
                    ) : (
                    <>
                            <Flex align="center" gap="middle" className="fullscreen-spin">
                                <Spin indicator={<LoadingOutlined spin />} size="large" />
                            </Flex>
                    </>
                    )
            }
           
        </>
    );
}
export default CompanyItem;