import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { getjob } from '../../services/datajob';
import { getcompany } from '../../services/datacompany';
function Jobitem() {
    const { jobId } = useParams();
    const [jobitem, setJobitem] = useState([]);
    const [company, setCompany] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getjob(jobId);
            const companyResponse = await getcompany(response.idCompany);
            console.log(response);
            console.log(companyResponse);
            setJobitem(response);
            setCompany(companyResponse);
        }
        fetchData();

    }, [jobId])
    const handleClick = (jobId) => {
        return () => {
            navigate(`/uploadcv/${jobId}`);
        }
    }

    return (
        <>
            <div className="container">
                <div className="job-item">
                    <h2>{jobitem.name}</h2>
                    <p>Công ty : {company.companyName}</p>
                    <p>Giới thiệu : {company.description}</p>
                    <p> {company.detail}</p>
                    <p>{jobitem.description}</p>

                    <p> Địa chỉ trụ sở chính : {company.address}</p>
                    <p> Phương thức liện hệ : {company.phone} {company.email}</p>
                    <p>Thời gian hoạt động : {company.workingTime}</p>
                    <p>Địa điểm : {
                        jobitem.city && jobitem.city.map((item, index) => {
                            return <span key={index}>{item} </span>
                        })
                    }
                    </p>
                    <p>Lương : {jobitem.salary}</p>
                    <p> Thời gian đăng tuyển : {jobitem.createAt}</p>
                    <p> Thời gian kết thúc : {jobitem.updateAt}</p>
                    <p> Yêu cầu các kỹ năng : {
                        jobitem.city && jobitem.tags.map((item, index) => {
                            return <span key={index}>{item} </span>
                        }
                        )
                    }</p>
                    <button onClick={handleClick(jobId) }>Nộp hồ sơ ngay</button>
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
export default Jobitem;