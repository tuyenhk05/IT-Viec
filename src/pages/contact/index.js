import "./contact.scss"; 
function Contact() {
  return (
    <>
      <header>
        <div className="container">
                  <h1>Liên Hệ Với IT-Vie</h1>
          <p>Chúng tôi sẵn sàng hỗ trợ bạn với mọi thắc mắc về tuyển dụng IT</p>
        </div>
      </header>

      <section className="contact-info">
        <div className="container">
          <h2>Thông Tin Liên Hệ</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Địa Chỉ</h3>
              <p>123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
            </div>
            <div className="info-card">
              <h3>Email</h3>
              <p>itvietnam@gmail.com</p>
            </div>
            <div className="info-card">
              <h3>Điện Thoại</h3>
              <p>(+84) 123 456 789</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form">
        <div className="container">
          <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>
          <form>
            <input type="text" placeholder="Họ và Tên" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Tin nhắn của bạn" required></textarea>
            <button type="submit">Gửi</button>
          </form>
        </div>
      </section>

      <section className="map">
        <div className="container">
          <h2>Vị Trí Của Chúng Tôi</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447496137125!2d106.69807531474895!3d10.776389992319865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f8e5c7db%3A0x8c7f2d76b91e9e2!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1698765432100!5m2!1sen!2s"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <footer>
        <div className="container">
                  <p>© 2025 IT-Vie. Tất cả quyền được bảo lưu.</p>
          <div className="links">
            <a href="/about">Về Chúng Tôi</a>
            <a href="/contact">Liên Hệ</a>
            <a href="/privacy">Chính Sách Bảo Mật</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Contact;