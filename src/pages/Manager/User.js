import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom'; 
import { getCookie } from '../../helpers/cookie'; // Import hàm getCookie để lấy cookie
import { useSelector } from 'react-redux'; // Import useSelector để truy cập trạng thái Redux
import { ProfileOutlined, TeamOutlined } from '@ant-design/icons';
import { getalljob } from "../../services/datajob";
import { getallcv } from "../../services/dataCv";

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