import React from 'react';
import { Outlet } from 'react-router-dom';
import { getCookie } from '../../../helpers/cookie'; // Import hàm getCookie để lấy cookie
function Recruit() {
    const user = getCookie('companyToken'); // Lấy token công ty từ cookie
    return (
        <>
            {
                user ? (
                    <>
                        <Outlet /> {/* Hiển thị các trang con của quản lý tuyển dụng */}
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

export default Recruit;