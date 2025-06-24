import React from 'react';
import { Form, Input, Button } from 'antd';
import { useState,useEffect } from 'react'; 
import { getallcompany } from '../../services/datacompany';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation }
import { setCookie } from '../../helpers/cookie'; // Assuming you have a utility function to set cookies
import { RollbackOutlined } from '@ant-design/icons'; // Importing Rollback icon for back navigation
import "./Login.scss"; // Importing the CSS file for styling"
import { islogin } from '../../action/login';
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions
const Login = () => {
    const [compantName, setCompany] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    const erorrs = document.querySelector('.text');
    const dispatch = useDispatch(); // Initialize useDispatch to dispatch actions
    useEffect(() => {
        const fetchCompanyName = async () => {
            try {
                const response = await getallcompany(); // Assuming this function fetches the company name

                setCompany(response);
            } catch (error) {
                console.error('Error fetching company name:', error);
            }
        }
        fetchCompanyName();
      
        }, []);
  console.log(compantName);
    const onFinish = (values) => {
        const matchedCompany = compantName.find(
            (item) => item.email === values.Email && item.password === values.password
        );

        if (matchedCompany) {
            setCookie('companyId', matchedCompany.id, 0.3); // Set cookie for 7 days
            setCookie('companyName', matchedCompany.companyName, 0.3); // Set cookie for company name
            setCookie('companyToken', matchedCompany.token, 0.3); // Set cookie for company name
            dispatch(islogin(matchedCompany.id)); // Dispatch login action with company ID

            navigate("/");
        } else {
            erorrs.innerHTML = "*Sai tên tài khoản hoặc mật khẩu"; // Display error message
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleClick = () => {
        navigate("/"); // Navigate back to the home page
    }
    return (
        <>
            <div className="login">
                <div onClick={handleClick} className="back_home container"><RollbackOutlined style={{ fontSize: '36px', color: '#fff' }} /></div>
        <div style={{ maxWidth: 400, margin: '50px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
                    <h2 style={{ textAlign: 'center', color:'#000' }}>Login</h2>
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
                <Form.Item
                    label="Email"
                            name="Email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                        </Form.Item>
                        <div className="text" style={{ padding: "10px",color:"red" }}></div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
                </div>
            </div>
        </>

    );
};

export default Login;