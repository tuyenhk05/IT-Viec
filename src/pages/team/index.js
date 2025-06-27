import "./team.scss";
import anh1  from "../../images/anh1.jpg";
import anh2  from "../../images/anh2.jpg";
import anh3  from "../../images/anh3.jpg";
function Team() {
    return (
        <>
            <header>
                <div className="container team">
                    <h1>Đội Ngũ Vận Hành IT-Vie</h1>
                    <p>Gặp gỡ những người đứng sau thành công của IT-Vie</p>
                </div>
            </header>

            <section className="intro">
                <div className="container">
                    <h2>Về Đội Ngũ Của Chúng Tôi</h2>
                    <p>
                        Đội ngũ vận hành của IT-Vie là tập hợp những chuyên gia đam mê công nghệ và tuyển dụng,
                        luôn nỗ lực kết nối tài năng IT với các cơ hội việc làm tốt nhất.
                    </p>
                </div>
            </section>

            <section className="team">
                <div className="container">
                    <h2>Gặp Gỡ Đội Ngũ</h2>
                    <div className="team-grid">
                        <div className="team-card">
                            <img src={anh1} alt="Nguyễn Văn An"/>
                                <h3>Nguyễn Văn An</h3>
                                <p className="role">Giám đốc điều hành</p>
                            <p>An có hơn 10 năm kinh nghiệm trong ngành công nghệ và tuyển dụng, dẫn dắt IT-Vie với tầm nhìn chiến lược.</p>
                        </div>
                        <div className="team-card">
                            <img src={anh2} alt="Trần Thị Bình"/>
                                <h3>Trần Thị Bình</h3>
                                <p className="role">Trưởng phòng kỹ thuật</p>
                            <p>Bình đảm bảo nền tảng IT-Vie hoạt động mượt mà, mang đến trải nghiệm tốt nhất cho người dùng.</p>
                        </div>
                        <div className="team-card">
                            <img src={anh3} alt="Lê Minh Châu"/>
                                <h3>Lê Minh Châu</h3>
                                <p className="role">Chuyên gia tuyển dụng</p>
                                <p>Châu chuyên kết nối ứng viên IT với các công ty hàng đầu, với sự am hiểu sâu sắc về ngành.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="footer_team">
                <div className="container">
                    <p>© 2025 IT-Vie. Tất cả quyền được bảo lưu.</p>
                    <div className="links">
                        <a href="/">Về Chúng Tôi</a>
                        <a href="/contact">Liên Hệ</a>
                        <a href="/privacy">Chính Sách Bảo Mật</a>
                    </div>
                </div>
            </footer>        </>
    );
}   
export default Team;