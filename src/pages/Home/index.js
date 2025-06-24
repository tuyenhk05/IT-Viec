import "./Home.scss"; 
import React from "react";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/joblist");

    }
    return (
        <>
            <header className="headerr">
                <div className="headerr__content">
                    <h1 className="headerr__title">Chào Mừng Đến Với IT-Vie</h1>
                    <p className="headerr__subtitle">Kết nối tài năng công nghệ với cơ hội việc làm mơ ước</p>
                </div>
            </header>

            <section className="about">
                <div className="about__container">
                    <h2 className="about__title">Về Chúng Tôi</h2>
                    <p className="about__desc">
                        IT-Vie là nền tảng tuyển dụng chuyên biệt dành cho ngành công nghệ thông tin tại Việt Nam.
                        Chúng tôi giúp các ứng viên IT tìm kiếm việc làm phù hợp và hỗ trợ doanh nghiệp tuyển dụng
                        những tài năng xuất sắc nhất.
                    </p>
                </div>
            </section>

            <section className="why">
                <div className="why__container">
                    <h2 className="why__title">Tại Sao Chọn IT-Vie?</h2>
                    <div className="why__list">
                        <div className="why__item">
                            <h3 className="why__item-title ">Cơ Hội Việc Làm Đa Dạng</h3>
                            <p className="why__item-desc ">
                                Hàng ngàn vị trí IT từ lập trình viên, kỹ sư DevOps đến quản lý dự án.
                            </p>
                        </div>
                        <div className="why__item">
                            <h3 className="why__item-title">Kết Nối Trực Tiếp</h3>
                            <p className="why__item-desc">
                                Liên kết trực tiếp với các công ty công nghệ hàng đầu tại Việt Nam và quốc tế.
                            </p>
                        </div>
                        <div className="why__item ">
                            <h3 className="why__item-title">Hỗ Trợ Cá Nhân Hóa</h3>
                            <p className="why__item-desc">
                                Gợi ý việc làm phù hợp dựa trên kỹ năng và sở thích của bạn.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta">
                <div className="cta__container">
                    <h2 className="cta__title">Bắt Đầu Hành Trình Sự Nghiệp Của Bạn</h2>
                    <p className="cta__desc">
                        Đăng ký ngay hôm nay để khám phá các cơ hội việc làm IT tốt nhất và xây dựng tương lai sự nghiệp của bạn!
                    </p>
                    <button onClick={handleClick }>
                        Bắt đầu
                    </button>
                </div>
            </section>

            <footer className="footer">
                <div className="footer__container ">
                    <p className="footer__copyright">&copy; 2025 IT-Vie. Tất cả quyền được bảo lưu.</p>
                    <div className="footer__links ">
                        <a href="/" className="footer__link ">Về Chúng Tôi</a>
                        <a href="/contact" className="footer__link ">Liên Hệ</a>
                        <a href="/privacy" className="footer__link ">Chính Sách Bảo Mật</a>
                    </div>
                </div>
            </footer>
        </>
    );
}
export default Home;