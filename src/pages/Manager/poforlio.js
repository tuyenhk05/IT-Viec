import React, { useState, useEffect } from 'react';
import { getCookie } from '../../helpers/cookie'; // Import hàm getCookie để lấy cookie
import { useSelector } from 'react-redux'; // Import useSelector để truy cập trạng thái Redux
import { getcompany,putcompany } from '../../services/datacompany';
import { Button, Form, Input, message } from 'antd';
import { FormOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons'; // Import biểu tượng FormOutlined

function Profile() {
    const state = useSelector(state => state.loginReducer); // Lấy trạng thái đăng nhập từ Redux
    const [profileData, setProfileData] = useState(null);
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();
    const user = getCookie("companyToken");
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Chỉnh sửa thông tin thành công',
        });
    };

    
    useEffect(() => {
        if (state.isLogin) {
            // Giả sử bạn có một API để lấy thông tin hồ sơ
            const fetchProfileData = async () => {
                try {
                    const response = await getcompany(getCookie("companyId")); // Sử dụng hàm getcompany để lấy thông tin công ty
                    setProfileData(response);
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                }
            };
            fetchProfileData();
        }
    }, [state.isLogin]); // Chỉ gọi API khi người dùng đã đăng nhập


    // Đảm bảo rằng profileData đã được cập nhật trước khi render form
    if (!profileData) {
        return <div>Loading...</div>; // Hiển thị thông báo khi dữ liệu chưa có
    }
    const handleSubmit = (values) => {
        setComponentDisabled(true);
        // Gọi API để cập nhật thông tin công ty với giá trị từ form
        values = { ...values, token: getCookie("companyToken"), password:profileData.password }; // Thêm companyToken vào values
        
        putcompany(getCookie("companyId"), values);
        success(); // Hiển thị thông báo thành công
    }
    let values = {
        companyName: profileData.companyName,
        phone: profileData.phone,
        email: profileData.email,
        website: profileData.website,
        address: profileData.address,
        workingTime: profileData.workingTime,
        quantityPeople: profileData.quantityPeople,
        description: profileData.description,
        detail: profileData.detail,
        
    }
    const handleCancel = () => {
        setComponentDisabled(true);
        
        // Đặt lại giá trị của form về giá trị ba
       
        document.querySelector('form').reset(); // Đặt lại form về giá trị ban đầu

    }

   
  
    return (
        <>
            {
                user ?
                    (
                        <>
                        { contextHolder }
                        < div className="container">
            <h2>Chỉnh sửa thông tin công ty</h2>
            {
                componentDisabled ? (
                    <Button type="primary" icon={< FormOutlined />} onClick={() => { setComponentDisabled(false) }}>Chỉnh sửa</Button>
                )
                    :
                    (
                        ""
                    )
            }

            <Form
                labelCol={{ span: 20 }}
                wrapperCol={{ span: 22 }}
                style={{ maxWidth: 2200, color: '#000' }}
                layout="vertical"
                disabled={componentDisabled}
                initialValues={
                    values
                }
                key={componentDisabled.toString()}
                size="large"
                onFinish={handleSubmit}
            >

                <Form.Item label={null}>

                </Form.Item>

                <Form.Item label="Tên công ty" name="companyName">
                    <Input />
                </Form.Item>

                <Form.Item label="Số điện thoại" name="phone">
                    <Input />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Website" name="website">
                    <Input />
                </Form.Item>

                <Form.Item label="Địa chỉ" name="address">
                    <Input />
                </Form.Item>

                <Form.Item label="Thời gian làm việc" name="workingTime">
                    <Input />
                </Form.Item>

                <Form.Item label="Số lượng nhân viên" name="quantityPeople">
                    <Input />
                </Form.Item>

                <Form.Item label="Mô tả" name="description">
                    <Input />
                </Form.Item>

                <Form.Item label="Chi tiết" name="detail">
                    <Input />
                </Form.Item>
                {
                    componentDisabled ?
                        (
                            ""
                        ) :
                        (
                            <><div className="button">
                                <div className="button_1">
                                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />}  >Lưu</Button>
                                </div>
                                <div className="button_2">
                                    <Button type="primary" icon={<CloseOutlined />} onClick={handleCancel}>Hủy</Button>
                                </div>
                            </div>

                            </>
                        )
                }

            </Form >
                            </div >
        </>
                    ):
                        (
                                  <>      Bạn không có quyền truy cập vào trang này. Vui lòng đăng nhập với tài khoản quản lý.</>
                )
                
            }
        </>
    );
}

export default Profile;
