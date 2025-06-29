import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { getCookie } from '../../../helpers/cookie';
import { getalljob,delJob } from "../../../services/datajob";
import { Button, message, Popconfirm } from 'antd'; 
import { PlusOutlined, EyeOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import "./Edit_Recruit"
function Recruitment() {
	const [data, setdata] = useState([]);
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
    const user = getCookie("companyToken");
	const success = () => {
		messageApi.open({
			type: 'error',
			content: 'Đã xóa',
		});
	};
	useEffect(() => {
		const fetchData = async () => {
			const companyId = getCookie('companyId');
			const response = await getalljob();
			const jobs = response.filter(job => job.idCompany === companyId);
			setdata(jobs);
		};
		fetchData();
	}, [data]);
	//const reLoadData = async () => {
	//	const companyId = getCookie('companyId');
	//	const response = await getalljob();
	//	const jobs = response.filter(job => job.idCompany === companyId);
	//	setdata(jobs);
 //   }
	const confirm =  (e)=> {
		
		
		delJob(e);
		/*await reLoadData();*/
        success();

	};
	const cancel = e => {
		console.log(e);
		message.error('Click on No');
	};
	const handleEdit = (id) => () => {
        navigate(`/recruitment/${id}`);
	};
	const handlepostjob = () => {
		navigate('/recruitment/add');
    }
	return (
		<>
			{
				user ? (
					<>
						{contextHolder}
						<div className="container">
							<h2>
								Quản lý tin tuyển dụng
							</h2>
							<Button type="primary" className="recur_add_btn" onClick={handlepostjob}> <PlusOutlined />Thêm tin tuyển dụng</Button>
							{
								data.map((item, index) => (
									<div className="recurItem" key={index}>
										<h2 className="recurItem_name">{item.name}</h2>
										{item.status ? (
											<p className="recurItem_status">Trạng thái: <span className="status_active">Đang hoạt động</span></p>
										) : (
											<p className="recurItem_status">Trạng thái: <span className="status_inactive">Ngừng hoạt động</span></p>
										)}
										<p className="recurItem_dec">{item.description}</p>
										<p className="recurItem_salary">Mức lương: {item.salary} VNĐ</p>
										<p className="recurItem_city">
											Thành phố : {item.city.join(', ')}

										</p>
										<p className="recurItem_tags">
											Tags:
											{item.tags.map((tag, tagIndex) => (
												<span key={tagIndex} className="recurItem_tag">{tag}</span>
											))}
										</p>
										<p className="recurItem_date">Ngày đăng: {item.createAt}</p>
										<div className="recurItem_btns">
											<Button type="default" icon={< EyeOutlined />} onClick={() => { navigate(`/aplicant/list/${item.id}`) }} className="recurItem_btn">Xem ứng viên</Button>
											<Button type="primary" icon={<FormOutlined />} className="recurItem_btn" onClick={handleEdit(item.id)}>Chỉnh sửa</Button>
											<Popconfirm
												title="Xóa thông tin job này"
												description="Bạn có chắc chắn muốn xóa?"
												onConfirm={() => { confirm(item.id) }}
												onCancel={cancel}
												okText="Xóa"
												placement="topRight"
												cancelText="Hủy"
											>
												<Button type="danger" icon={<DeleteOutlined />} className="recurItem_btn">Xóa</Button>
											</Popconfirm>


										</div>
									</div>
								))
							}
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

export default Recruitment;