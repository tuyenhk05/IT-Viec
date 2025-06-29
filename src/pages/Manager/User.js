import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom'; 
import { getCookie } from '../../helpers/cookie'; // Import hàm getCookie để lấy cookie
import { useSelector } from 'react-redux'; // Import useSelector để truy cập trạng thái Redux
import { ProfileOutlined, TeamOutlined } from '@ant-design/icons';
import { getalljob } from "../../services/datajob";
import { getallcv } from "../../services/dataCv";
import { Row, Col } from 'antd'; 
import { Pie, Bar } from '@ant-design/plots';

import "./manager.scss";

function User() {
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
    const state = useSelector(state => state.loginReducer); // Lấy trạng thái đăng nhập từ Redux
    const [recruitment, setRecruitment] = useState([]);
    const [candidates, setCandidates] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const companyId = getCookie('companyId');
            const response = await getalljob();
            const jobs = response.filter(job => job.idCompany === companyId);
            const data = await getallcv();
            const candidates = data.filter(cv => cv.idCompany === companyId);
            setCandidates(candidates);
            setRecruitment(jobs);
        };
        fetchData();
    }, []);
    
    // Đếm số lượng công việc đang hoạt động và ngừng hoạt động
    const statusTrue = recruitment.filter(job => job.status === true).length;
    const statusFalse = recruitment.filter(job => job.status === false).length;
    const data = [
        {
            type: 'Đang hoạt động',
            value:parseInt(statusTrue)
        }, {
            type: 'Ngừng hoạt động',
            value: parseInt(statusFalse)
        }
    ];

            let data1 = [];
            recruitment.forEach(job => { 
                let count = 0;
                candidates.forEach(cv => {
                    if (job.id === cv.idJob) {
                        count += 1;
                    }
                });
              
                    data1.push({ type: job.name, value: count });
                
            });
  
    console.log(data1);
    const config1 = {
        data:data1,
        xField: 'type',
        yField: 'value',
        colorField: 'type',
       
        scale: {
            color: {
                range: ['#f4664a', '#faad14', '#a0d911', '#52c41a', '#13c2c2', '#1890ff', '#2f54eb', '#722ed1'],
            },
        },
    }
    const config = {
        data,
        angleField: 'value',
        colorField: 'type', 
        scale: {
            color: {
                range: ['#2389FF', '#FE0032'],
            },
        },
      
        radius: 0.8, 
        label: {
            text: 'value',
            style: {
                fontWeight:'bold',
            },
        },
        legend: {
            color: {
               

                title: false,
                position: 'bottom',
                rowPadding: 5,
            },
        },
    };
const navbase = [
    {
        key: '1',
        label: 'Tin tuyển dụng',
        quality: recruitment.length,
        icon: <ProfileOutlined />
    },
    {
        key: '2',
        label: 'Ứng viên ứng tuyển',
        quality: candidates.length,
        icon: <TeamOutlined />
    }
    ];
    const handleClick = (key) => () => {
        switch (key) {
            case '1':
                navigate('/recruitment'); // Điều hướng đến trang quản lý tuyển dụng
                break;
            case '2':
                navigate('/aplicant'); // Điều hướng đến trang quản lý ứng viên
                break;
            default:
                break;
        }
    }
   
  return (
      <>
          {
              state.isLogin ? (
                  <div className="dasboard">
                   
                          <div className="nameCompany">
                              <h2>Chào mừng trở lại, <span className="header__name">{getCookie("companyName")}</span></h2>
                              <p className="header__content">Quản lý thông tin công ty và tin tuyển dụng của bạn</p>
                          </div>
                          <div className="contentt">
                          <div className="Listcate">
                              {
                                  navbase.map((item, index) => (
                                      <div className="cateItem" key={index} onClick={handleClick(item.key) }>
                                          <div className="cateItem_left">
                                              {item.icon}
                                          </div>
                                          <div className="cateItem_right">
                                              <p>{item.quality}</p>
                                              <h3>{item.label}</h3>
                                              
                                              </div>
                                      </div>
                                  ))
                              }
                          </div>
                         
                     
                      </div>
                      {
                          recruitment.length > 0 && (
                              <Row gutter={[16, 24]}>
                                  <Col xs={24} sm={24} md={24} lg={12} xl={12} className="">
                                      <h2>Biểu đồ trạng thái hoạt động của Jobs</h2>
                                      <Pie {...config} />
                                  </Col>
                                  <Col xs={24} sm={24} md={24} lg={12} xl={12} className="">
                                  <h2>Ứng viên ứng tuyển theo Jobs</h2>
                                      <Bar {...config1} />

                                  </Col>

                              </Row>
                              )
                      }
                 </div>
                  

              ) : (
                  <div className="user-container">
                      <h2>Bạn chưa đăng nhập</h2>
                      <p>Vui lòng đăng nhập để xem thông tin người dùng.</p>
                  </div>
                  )
          }

      </>
  );
}
export default User;