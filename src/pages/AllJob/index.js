
import React, { useState, useEffect } from 'react';
import { getalljob,getalljobb } from "../../services/datajob";
import { getalltags } from "../../services/dataTags";
import { gettagsjob } from "../../services/datajob";
import "./alljob.scss";
import Job from './job';
import { Pagination } from 'antd';
function AllJob() {
    const [jobList, setJobList] = useState([]);
    const [jobpage, setjobPage] = useState([]);
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("All");
    useEffect(() => {
        const fetchData = async () => {
            const reponse = await getalljob();
            const tagss = await getalltags();
            const jobs = await getalljobb(1);
            setjobPage(jobs);
            setTags([{ key: "all", value: "Tất cả" }, ...tagss,]);

            setJobList(reponse);
  
        }
        fetchData();
        }, [])

    const handleClickTag = (tag) => () => {
        const fetchData = async () => {
            const reponse = await gettagsjob(tag);
            setjobPage(reponse);
            setJobList(reponse);
            console.log(reponse);

        }
        if (tag === "Tất cả") {
            const fetchData = async () => {
                const reponse = await getalljob();
                setJobList(reponse);
            }
            fetchData();
            setTag("Tất cả");
         
        } else {
            fetchData();
            setTag(tag);
        }


       
    }
    const handleChange = (page) => {
        const fetchData = async () => {
            const reponse = await getalljobb(page);
            setjobPage(reponse);
        }
        fetchData();
    }
    return (
        <>
            <div className="containerr">
                <h1 > Tất cả các job</h1>
                
                <h3>
                    Tags :
                </h3>
                <div className="job_tags">
                    {
                        tags.map((item, index) => (
                            <div className="job_tags-item" key={index} onClick={handleClickTag(item.value)}>
                                {item.value}
                            </div>
                        ))
                    }
                </div>
                {tag && (
                    <div >
                        <h3>Phân loại : {tag}</h3>
                    </div>
                ) }
                <div className="job">
                {jobpage.map((item, index) => (
                    <>  {
                        item.status ? (
                            <Job item={item}  key={index} />
                           
                        ): ("")}
                </>
                )
                )
                    } 
                </div>
                <Pagination defaultCurrent={1} align="center" total={jobList.length} defaultPageSize={6} onChange={handleChange } />;
            </div>
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
export default AllJob;