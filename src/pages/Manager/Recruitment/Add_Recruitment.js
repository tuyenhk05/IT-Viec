/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getalltags } from '../../../services/dataTags';
import { postjob } from '../../../services/datajob';
import { getallcity } from '../../../services/datacity';
import { getCookie } from '../../../helpers/cookie';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
function Add_Recruitment() {
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        const fetchData = async () => {
            const tagsArray = await getalltags();
            const cityArray = await getallcity();
            setCity(cityArray);
            setTags(tagsArray);
        };
        fetchData();
    }, []);
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Thêm công việc mới thành công',
        });
    };
   


  
            function formatDateTime(date) {
                const pad = n => n < 10 ? '0' + n : n;
                return date.getFullYear() + '-' +
                    pad(date.getMonth() + 1) + '-' +
                    pad(date.getDate()) + ' ' +
                    pad(date.getHours()) + ':' +
                    pad(date.getMinutes()) + ':' +
                    pad(date.getSeconds());
            }

            // In handleSubmit, replace new Date().toISOString() with formatDateTime(new Date())
            const handleSubmit = async (values) => {
                const idCompany = getCookie('companyId');
                const now = new Date();
                const jobData = {
                    name: values.jobName,
                    description: values.description,
                    salary: values.salary,
                    city: values.city,
                    status: values.status || false,
                    tags: values.tags,
                    idCompany: idCompany,
                    id: "j" + Math.floor(Math.random() * 1000000),
                    createAt: formatDateTime(now), // Format as "YYYY-MM-DD HH:mm:ss"
                    updateAt: formatDateTime(now),
                };
                console.log(jobData);
                await postjob(jobData);
                success();
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
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
            {contextHolder}
            <div className="container">
                <h2>Thêm công việc mới</h2>
                <Form
                    labelCol={{ span: 20 }}
                    wrapperCol={{ span: 22 }}
                    style={{ maxWidth: 2200, color: '#000' }}
                    layout="vertical"
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

                    <Button type="primary" htmlType="submit" icon={<PlusOutlined /> }>
                        Tạo
                    </Button>
                    <Button type="primary" icon={<CloseOutlined />} style={{ marginLeft: 10 }} onClick={handleCancel}>
                        Hủy
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Add_Recruitment;
