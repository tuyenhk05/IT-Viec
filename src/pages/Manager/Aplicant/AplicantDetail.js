import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getcv, putcv } from '../../../services/dataCv';
import { getalljob } from '../../../services/datajob';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Flex } from 'antd';
import { getCookie } from '../../../helpers/cookie';

function ApplicantDetail() {
    const { aplicantId } = useParams();
    const [data, setData] = useState(null); // Changed from [] to null for better loading state
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState(null); // Added error state
    const navigate = useNavigate();
    const user = getCookie("companyToken");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [cvResponse, jobsResponse] = await Promise.all([
                    getcv(aplicantId),
                    getalljob()
                ]);

                setData(cvResponse);
                setJobs(jobsResponse);
                const datanew = { ...cvResponse, statusRead: true }; // Ensure data is an object}
                putcv(aplicantId, datanew); // Update statusRead to true
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Không thể tải dữ liệu. Vui lòng thử lại.');
            } finally {
                setLoading(false);
            }
        };
        if (aplicantId) {
            fetchData();
            
        }
       
    }, [aplicantId]); // Added aplicantId to dependency array
    if (!data&&jobs.length===0) {
        return (
            <>
                <Flex align="center" gap="middle" className="fullscreen-spin">
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </Flex>
            </>

        )
    };
    // Helper function to find job name
    const getJobName = () => {
        const job = jobs.find(job => job.id === data?.idJob);
        return job ? job.name : 'Không xác định';
    };

   

    if (loading) {
        return (
            <div className="applicant-detail-container">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Đang tải thông tin...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="applicant-detail-container">
                <div className="error">
                    <p>{error}</p>
                    <button
                        className="btn-retry"
                        onClick={() => window.location.reload()}
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="applicant-detail-container">
                <div className="no-data">
                    <p>Không tìm thấy thông tin ứng viên</p>
                    <button
                        className="btn-back"
                        onClick={() => navigate(-1)}
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {
                user ? (
                    <>
                        <div className="applicant-detail-container">
                            <div className="applicant-detail">
                                <div className="applicant-detail__header">
                                    <button
                                        className="btn-back"
                                        onClick={() => navigate(-1)}
                                        aria-label="Quay lại"
                                    >
                                        ← Quay lại
                                    </button>
                                    <h2>Thông tin CV</h2>
                                </div>

                                <div className="applicant-detail__content">
                                    <div className="applicant-info">
                                        <div className="info-group">
                                            <label>Vị trí ứng tuyển:</label>
                                            <span>{getJobName()}</span>
                                        </div>

                                        <div className="info-group">
                                            <label>Tên:</label>
                                            <span>{data.name}</span>
                                        </div>

                                        <div className="info-group">
                                            <label>Email:</label>
                                            <span>{data.email}</span>
                                        </div>

                                        <div className="info-group">
                                            <label>Số điện thoại:</label>
                                            <span>{data.phone}</span>
                                        </div>

                                        <div className="info-group">
                                            <label>Mô tả:</label>
                                            <span className="description">{data.description}</span>
                                        </div>

                                        {data.linkProject && (
                                            <div className="info-group">
                                                <label>Link Project:</label>
                                                <a
                                                    href={data.linkProject}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-link"
                                                >
                                                    Xem project →
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <div className="applicant-actions">
                                        <a href={`mailto:${data.email}`}>
                                            <button className="btn-contact">
                                                <span>📧</span>
                                                Liên hệ qua Email
                                            </button>
                                        </a>

                                        {data.phone && (
                                            <a href={`tel:${data.phone}`}>
                                                <button className="btn-contact btn-phone">
                                                    <span>📞</span>
                                                    Gọi điện
                                                </button>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </>
                ) : (
                    <>
                        Bạn không có quyền truy cập vào trang này.
                    </>
                )
            }
        </>
    );
    }

    export default ApplicantDetail;