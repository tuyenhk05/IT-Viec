import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getjob } from '../../services/datajob';
import { getcompany } from '../../services/datacompany';
import { postcv } from '../../services/dataCv'; // Import postcv function
import './Upload.scss';  // Import CSS file for styling
import { message } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
const CVUpload = () => {
    const { jobId } = useParams();  // Lấy jobId từ URL
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();  // Hook để điều hướng
    const [cvData, setCvData] = useState({
        id: Date.now(),
        idCompany: '',
        idJob: jobId,
        name: '',
        phone: '',
        email: '',
        description: '',
        linkProject: '',
        city: '',
        statusRead: false,
        createAt: new Date().toISOString().split('T').join(' ').split('.')[0],
    });

    const [error, setError] = useState('');
    const [jobitem, setJobitem] = useState(null);  // Lưu thông tin công việc
    const [company, setCompany] = useState(null);  // Lưu thông tin công ty
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Nộp CV thành công',
        });
    };

    const errorr = () => {
        messageApi.open({
            type: 'error',
            content: 'Lỗi khi nộp CV',
        });
    };
    // Lấy dữ liệu công việc và công ty từ API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getjob(jobId);  // Lấy thông tin công việc
                const companyResponse = await getcompany(response.idCompany);  // Lấy thông tin công ty
                setJobitem(response);
                setCompany(companyResponse);
                setCvData((prevState) => ({
                    ...prevState,
                    idCompany: response.idCompany,
                    idJob: response.id,
                }));
            } catch (error) {
                console.error("Error fetching job or company data:", error);
            }
        };
        fetchData();
    }, [jobId]);  // useEffect sẽ chạy lại khi jobId thay đổi

    // Hàm cập nhật dữ liệu form khi người dùng nhập
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCvData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };



    // Hàm xử lý gửi dữ liệu CV
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cvData.name || !cvData.phone || !cvData.email || !cvData.description ) {
            setError('Vui lòng điền đầy đủ thông tin và chọn tệp CV');
            return;
        }

       
        try {
            const response = await postcv(1, cvData);
          
            if (response) {
                success();
            } else {
                errorr();            }
        } catch (error) {
            console.error('Error submitting CV:', error);
        }
        setTimeout(() => {
            navigate(-1);
        }, 2000); // Quay lại trang trước sau 2 giây
    };

    // Nếu dữ liệu công việc hoặc công ty chưa có, hiển thị "Loading..."
    if (!jobitem || !company) {
        return <div>Loading...</div>;
    }

    return (
        <>
        { contextHolder }
        <div className="cv-form-container">
            <h2>Đăng ký CV cho công việc: {jobitem.name}</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Họ và tên:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={cvData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={cvData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={cvData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Mô tả bản thân:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={cvData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="linkProject">Link Project (nếu có):</label>
                    <input
                        type="url"
                        id="linkProject"
                        name="linkProject"
                        value={cvData.linkProject}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">Địa chỉ (thành phố):</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={cvData.city}
                        onChange={handleInputChange}
                    />
                </div>

                

                <div className="form-group">
                    <button type="submit">Nộp hồ sơ</button>
                </div>
            </form>

            <div className="company-details">
                <h3>Thông tin công ty:</h3>
                <p><strong>Công ty:</strong> {company.companyName}</p>
                <p><strong>Địa chỉ:</strong> {company.address}</p>
                <p><strong>Phương thức liên hệ:</strong> {company.phone} | {company.email}</p>
            </div>
            </div>
        </>
    );
};

export default CVUpload;
