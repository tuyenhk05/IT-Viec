import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getallcv } from '../../../services/dataCv';
import { Button, Popconfirm, message } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import { delcv } from '../../../services/dataCv';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Flex } from 'antd';
import { getCookie } from '../../../helpers/cookie'; 

function AplicantList() {
    const { idJob } = useParams();
    const [datacv, setDatacv] = useState([]);
    const navigate = useNavigate(); 
    const [messageApi, contextHolder] = message.useMessage();
    const [reload, setReload] = useState(false);
    const user = getCookie("companyToken");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getallcv();
                const setdata = response.filter((item) => item.idJob === idJob);
                
                setDatacv(setdata);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [reload]);
    if (datacv.length===0 ) {
        return (
            <>
                <Flex align="center" gap="middle" className="fullscreen-spin">
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </Flex>
            </>

        )
    };
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
    console.log(datacv);

  return (
      <>
          {
              user ? (
                  <>
                      {contextHolder}
                      <br />
                      <div className="btn-back" onClick={() => { navigate(-1) }}>← Quay lại</div>
                      <br />
                      <br />
                      {
                          datacv.length > 0 ? (
                              <>
                                  {
                                      datacv.map((item, index) => (
                                          <div key={index} className="applicant-card">
                                              <h2>{item.name}</h2>
                                              <p>Số điện thoại: {item.phone}</p>
                                              <p>Địa chỉ: {item.city}</p>
                                              <p>Email: {item.email}</p>
                                              <p>{item.description}</p>
                                              <p>Ngày tạo: {item.createAt}</p>
                                              {
                                                  item.statusRead === true ? (
                                                      <p style={{ color: 'green', display: 'block' }}>Đã đọc</p>
                                                  ) : (
                                                      <p style={{ color: 'red', display: 'block' }}>Chưa đọc</p>
                                                  )
                                              }
                                              <Button type="primary" icon={<EyeOutlined />} style={{ display: 'inline', marginRight: 10 }} onClick={() => { navigate(`/aplicant/${item.id}`) }}>Xem chi tiết</Button>
                                              <Popconfirm
                                                  title="Xóa CV này"
                                                  description="Bạn có chắc chắn muốn xóa?"
                                                  onConfirm={() => { confirm(item.id) }}
                                                  onCancel={cancel}
                                                  okText="Xóa"
                                                  placement="topRight"
                                                  cancelText="Hủy"
                                              >
                                                  <Button type="danger" style={{ display: 'inline' }} icon={<DeleteOutlined />} className="button_del">Xóa</Button>
                                              </Popconfirm>
                                          </div>
                                      ))
                                  }
                              </>
                          ) : (
                              <>

                                  <h2>Chưa có ứng viên nào</h2 >
                              </>
                          )
                      }
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
export default AplicantList;