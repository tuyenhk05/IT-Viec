/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { getCookie } from '../../../helpers/cookie'; // Import hàm getCookie để lấy cookie
import { delcv, getallcv } from '../../../services/dataCv';
import { getalljob } from '../../../services/datajob';
import { Button, Popconfirm, message } from 'antd'; 
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
function Home_aplicant() {
    const [aplicants, setApplicants] = useState([]);
    const [jobs, setJobs] = useState([]);
    const idCompany = getCookie('companyId');
    const [messageApi, contextHolder] = message.useMessage();
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    console.log('Company ID:', idCompany);
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await getallcv();
                const dataJob = await getalljob();
                const data= response.filter(cv => cv.idCompany === idCompany);
                setApplicants(data);
                setJobs(dataJob);
            } catch (error) {
                console.error('Error fetching applicants:', error);
            }
        };
        fetchApplicants();
    }, [reload]);
    const success = () => {
        messageApi.open({
            type: 'error',
            content: 'Đã xóa',
        });
    };
    const confirm = (e) => {
        delcv(e);
        success();
        setReload(!reload); // Reload data after deletion


    };
    const cancel = e => {
       
    };
   
  return (
      <>
          {contextHolder}
          <div className="container">
              <h1>Quản lý CV</h1>
              {
                  aplicants.length > 0 ? (
                      aplicants.map((applicant, applicantIndex) => {
                          const job = jobs.find(job => job.id === applicant.idJob);
                          return job ? (
                              <div key={applicantIndex} className="applicant-card">
                                  <h2>{applicant.name}</h2>
                                  <p>Vị trí ứng tuyển: {job.name}</p>
                                  <p>Số điện thoại: {applicant.phone}</p>
                                  <p>Địa chỉ: {applicant.city}</p>
                                  <p>Email: {applicant.email}</p>
                                  <p>{applicant.description}</p>
                                  <p>Ngày tạo: {applicant.createAt}</p>
                                  {
                                      applicant.status === true ? (
                                          <p style={{ color: 'green', display: 'block' }}>Đã đọc</p>
                                      ) : (
                                              <p style={{ color: 'red', display: 'block' }}>Chưa đọc</p>
                                      )
                                  }
                                  <Button type="primary" icon={<EyeOutlined />} style={{ display: 'inline',marginRight:10 }} onClick={() => {navigate(`/aplicant/${applicant.id}`) }}>Xem chi tiết</Button>
                                  <Popconfirm
                                      title="Xóa CV này"
                                      description="Bạn có chắc chắn muốn xóa?"
                                      onConfirm={() => { confirm(applicant.id) }}
                                      onCancel={cancel}
                                      okText="Xóa"
                                      placement="topRight"
                                      cancelText="Hủy"
                                  >
                                      <Button type="danger" style={{ display: 'inline' }} icon={<DeleteOutlined /> } className="button_del">Xóa</Button>
                                  </Popconfirm>
                              </div>
                          ) : null;
                      })
                  ) : (
                      <p>Không có ứng viên nào.</p>
                  )
              }
          </div>
      </>
  );
}
export default Home_aplicant;