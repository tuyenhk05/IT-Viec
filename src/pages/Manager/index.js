import { Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
function Manager() {
    const user = getCookie("companyToken");
  return (
      <>
          {
              user ? (
                  <>
                      <Outlet />
                  </>
              ):(
                      <>
                          Bạn không có quyền truy cập vào trang này. Vui lòng đăng nhập với tài khoản quản lý.
                  </>
              )
          }
          
      </>
  );
}
export default Manager;