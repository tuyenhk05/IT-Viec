/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Select, message } from 'antd';
import { useParams } from 'react-router-dom';
import { getjob } from '../../../services/datajob';
import { useNavigate } from 'react-router-dom';
import { getalltags } from '../../../services/dataTags';
import { putjob } from '../../../services/datajob';
import { getallcity } from '../../../services/datacity';
import { FormOutlined, CloseOutlined } from '@ant-design/icons';
import { getCookie } from '../../../helpers/cookie'; 

function EditRecrui() {
    const { recruitmentId } = useParams();
    const [recruitmentData, setRecruitmentData] = useState(null);
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const user = getCookie("companyToken");

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Chỉnh sửa thông tin thành công',
        });
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await getjob(recruitmentId);
            const tagsArray = await getalltags();
            const cityArray = await getallcity();
            setRecruitmentData(response);
            setCity(cityArray);
            setTags(tagsArray);
        };
        fetchData();
    }, [recruitmentId]);

    if (!recruitmentData) {
        return <div>Loading...</div>; // Hiển thị thông báo khi dữ liệu chưa có
    }

    const initialValues = {
        jobName: recruitmentData.name,
        description: recruitmentData.description,
        salary: recruitmentData.salary,
        city: recruitmentData.city,
        status: recruitmentData.status,
        tags: recruitmentData.tags,
    };

    const handleSubmit = async (values) => {
        // Prepare data for update
        const updatedData = {
            ...recruitmentData,
            name: values.jobName,
            description: values.description,
            salary: values.salary,
            city: values.city,
            status: values.status,
            tags: values.tags,
        };
        try {
            await putjob(recruitmentId, updatedData);
            success();
            setTimeout(() => {
                navigate(-1);
            },1000)
            
        } catch (error) {
            // handle error (e.g., show notification)
            console.error('Update failed:', error);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const onChange = e => {
        // Optionally handle checkbox change
    };

    const handleChange = value => {
        // Optionally handle select change
    };

    return (
        <>
            {
                user ? (
                    <>
                        {contextHolder}
                        <div className="container">
                            <h2>Chỉnh sửa thông tin tuyển dụng</h2>
                            <Form
                                labelCol={{ span: 20 }}
                                wrapperCol={{ span: 22 }}
                                style={{ maxWidth: 2200, color: '#000' }}
                                layout="vertical"
                                initialValues={initialValues}
                                size="large"
                                onFinish={handleSubmit}
                            >
                                <Form.Item label="Tên công việc" name="jobName" rules={[{ required: true, message: 'Vui lòng nhập ô này !' }]}>
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: 'Vui lòng nhập ô này !' }]}>
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Lương" name="salary" rules={[{ required: true, message: 'Vui lòng nhập ô này !' }]}>
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Địa chỉ" name="city" rules={[{ required: true, message: 'Vui lòng nhập ô này !' }]}>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        options={city}
                                    />
                                </Form.Item>
                                <Form.Item label="Trạng thái hoạt động" name="status" valuePropName="checked">
                                    <Checkbox
                                        onChange={onChange}
                                        style={{ transform: 'scale(1.5)', marginLeft: 10 }}
                                    />
                                </Form.Item>
                                <Form.Item label="Tags" name="tags" rules={[{ required: true, message: 'Vui lòng nhập ô này !' }]}>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        onChange={handleChange}
                                        options={tags}
                                    />
                                </Form.Item>

                                <Button type="primary" htmlType="submit" icon={<FormOutlined />}>
                                    Cập nhật
                                </Button>
                                <Button type="primary" icon={<CloseOutlined />} style={{ marginLeft: 10 }} onClick={handleCancel}>
                                    Hủy
                                </Button>
                            </Form>
                        </div>
                    </>
                ) : (
                        <>
                            Bạn không có quyền truy cập vào trang này. Vui lòng đăng nhập với tài khoản quản lý.
                            </>
                )
            }
        </>
    );
}

export default EditRecrui;
