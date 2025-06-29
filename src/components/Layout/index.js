/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, Menu } from "antd";
import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./Layout.scss";
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state }
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    UserOutlined,
    TeamOutlined,
    LaptopOutlined,
    CoffeeOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { deleteAllCookies, getCookie } from  "../../helpers/cookie";
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions if needed }
import { islogin } from '../../action/login'; // Import action to set login state
import { islogout } from '../../action/login'; // Import action to set login state
const { Header, Sider, Content } = Layout;
function Layoutt() {
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.loginReducer); // Lấy trạng thái đăng nhập từ Redux

    useEffect(() => {
        const token = getCookie('companyToken');  // Lấy token từ cookie

        if (token && isLogin.isLogin === false) {
            const companyId = getCookie("companyId"); // Lấy companyId từ cookie
            if (companyId) {
                dispatch(islogin(companyId)); // Dispatch action islogin nếu có companyId
            }
        }
        
    }, [isLogin.isLogin]); 
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();  // Dùng useLocation để lấy đường dẫn hiện tại

    // Hàm xác định selectedKey dựa vào đường dẫn hiện tại
    const getSelectedKey = (path) => {
        if (path === '/') return '1-1';
        if (path.includes('joblist')) return '2-1';
        if (path.includes('search')) return '2-2';
        if (path.includes('team')) return '1-2';
        if (path.includes('contact')) return '1-3';
        if (path.includes('company')) return '3';
        if (path.includes('comunity')) return '4';

        if (path.includes('manager')) return '5-1';
        if (path.includes('profile')) return '5-2';
        if (path.includes('recruitment')) return '5-3';
        if (path.includes('aplicant')) return '5-4';
        return '';  // Default case nếu không khớp
    };

    // Hàm xác định defaultOpenKeys dựa vào đường dẫn
    const getOpenKeys = (path) => {
        if (path === '/' || path.includes('team') || path.includes('contact')) return ['1']; // Mở 'Trang chủ' nếu đường dẫn là '/'
        if (path.includes('joblist') || path.includes('search')) return ['2']; // Mở 'Job' nếu đường dẫn chứa 'joblist' hoặc 'search'
        if (path.includes('company') ) return ['3'];
        if (path.includes('comunity')) return ['4'];
        if (path.includes('/manager') || path.includes("profile") || path.includes("recruitment") || path.includes("aplicant" )) return ['5']; // Mở 'Quản lí' nếu người dùng đã đăng nhập và đường dẫn chứa 'manager')

        return []; // Default không mở menu con
    };

    // Quản lý trạng thái selectedKey và openKeys
    const [selectedKey, setSelectedKey] = useState(getSelectedKey(location.pathname));
    const [openKeys, setOpenKeys] = useState(getOpenKeys(location.pathname));

    // Hàm xử lý sự kiện mở/đóng menu con
    const handleOpenChange = (keys) => {
        setOpenKeys(keys);  // Cập nhật openKeys mỗi khi menu con mở hoặc đóng
    };

    // Dùng useEffect để reload menu khi đường dẫn thay đổi
    useEffect(() => {
        const newSelectedKey = getSelectedKey(location.pathname);
        const newOpenKeys = getOpenKeys(location.pathname);

        if (selectedKey !== newSelectedKey) {
            setSelectedKey(newSelectedKey);
        }
        if (JSON.stringify(openKeys) !== JSON.stringify(newOpenKeys)) {
            setOpenKeys(newOpenKeys);
        }
        // eslint-disable-next-line
    }, [location, isLogin.isLogin]);

    // Dữ liệu menu
 
    let itemsMenu = [
        {
            key: '1',
            label: 'Trang chủ',
            icon: <HomeOutlined />,
            children: [
                {
                    key: '1-1',
                    label: <Link to="/">Giới thiệu</Link>,
                },
                {
                    key: '1-2',
                    label: <Link to="team">Đội ngũ vận hành</Link>,
                },
                {
                    key: '1-3',
                    label: <Link to="contact">Thông tin liên hệ</Link>,
                }
            ]
        },
        {
            key: '2',
            label: 'Job',
            icon: <LaptopOutlined />,
            children: [
                {
                    key: '2-1',
                    label: <Link to="joblist" >Tất cả các job</Link>,
                },
                {
                    key: '2-2',
                    label: <Link to="search">Tìm kiếm Job</Link>,
                }
            ]
        },
        {
            key: '3',
            label: <Link to="company">Nhà tuyển dụng</Link>,
            icon: <CoffeeOutlined />
        },
        {
            key: '4',
            label: <Link to="comunity">Cộng đồng của chúng tôi</Link>,
            icon: <TeamOutlined />
        },
       
    ];
    if (isLogin.isLogin) {
        itemsMenu = [...itemsMenu, {

            key: '5',
            label: <p> Quản lý</p>,
            icon: <UserOutlined />,
            children: [
                {
                    key: '5-1',
                    label: <Link to="manager" >Dasboard</Link>,
                },
                {
                    key: '5-2',
                    label: <Link to="profile">Thông tin công ty</Link>,
                },
                {
                    key: '5-3',
                    label: <Link to="recruitment">Quản lý tin tuyển dụng</Link>,
                }, {
                    key: '5-4',
                    label: <Link to="aplicant">Quản lý ứng viên</Link>,
                }
            ]


        }]
    };
    const handleLogout = () => {
        deleteAllCookies();
        dispatch(islogout()); // Dispatch action để cập nhật trạng thái đăng nhập
    }

    return (
        <Layout>
            <Header className="header">
                <div className={window.innerWidth >= 560 && collapsed ? "header_logo header_logo-active" : "header_logo"}>
                   <Link to="/"> IT-Vie</Link>
                </div>
                <div className="header_nav">
                    <div className="header_nav-left" onClick={() => { setCollapsed(!collapsed) }}>
                        {window.innerWidth >= 560 ?  collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> : ("")}
                    </div>
                    {
                        isLogin.isLogin ? (
                            <>
                            <div className="header_nav-right">
                                    <span><UserOutlined />{getCookie("companyName")}</span>
                                    <span onClick={handleLogout }> <LogoutOutlined style={{ fontSize: '26px', color: '#08c' }} /></span>
                            </div>
                           
                            </>
                        ) : (
                                <div className="header_nav-right">
                                    <span><UserOutlined /> <Link to="login">Đăng nhập </Link></span>
                                </div>)
                    }
                </div>
            </Header>
           
            <Layout>

                <Sider className="sider" width="20%" collapsed={window.innerWidth <= 560 ? true : collapsed}>
                   
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedKey]}  // Cập nhật selectedKeys dựa trên đường dẫn
                        openKeys={openKeys}  // Dùng openKeys thay vì defaultOpenKeys
                        onOpenChange={handleOpenChange}  // Xử lý sự kiện mở/đóng menu con
                         
                        items={itemsMenu}
                    />
                    
                </Sider>
                <Content className="content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Layoutt;
