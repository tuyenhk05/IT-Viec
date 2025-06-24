import { useNavigate } from 'react-router-dom';
function Job(props) {
    const navigate = useNavigate();

    const { item  } = props;
    const handleClick = (id) => () => {
        navigate(`/joblist/${id}`);
    }
    return (
        <>
            <div className="job_item" onClick={handleClick(item.id)}>
                <div className="job_item-name">
                    <h3>{item.name}</h3>
                </div>
                <div className="job_item-salary">
                    <p>{item.salary}</p>
                </div>
                <div className="job_item-city">
                    <div>Địa điểm : </div>
                    {item.city.map((item, index) => (
                        <span key={index}>{item}</span>

                    ))}
                </div>
                <div className="job_item-day">
                    <p>Ngày đăng bài : {item.createAt}</p>
                    <p>Ngày hết hạn : {item.updateAt}</p>
                </div>
                <div className="job_item-tags">
                    <div>Tags : </div>
                    {item.tags.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </div>
                <div className="job_item-description">
                    <p>Mô tả : </p>
                    <p>{item.description}</p>
                </div>


            </div>
        </>)
}
export default Job;