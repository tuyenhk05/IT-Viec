import React, { useState, useEffect } from 'react';
import { getalltags } from '../../services/dataTags';
import { getallcity } from '../../services/datacity';
import { getalljob } from '../../services/datajob';
import { Select, Button } from 'antd';
import Job from '../../pages/AllJob/job';
import './search.scss';

function SearchJob() {
    const [city, setCity] = useState([]);
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState({ city: '', tag: '' });
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cityData, tagData] = await Promise.all([
                    getallcity(),
                    getalltags()
                ]);

                setCity([{ key: 'all', value: 'Tất cả' }, ...cityData]);
                setTags([{ key: 'all', value: 'Tất cả' }, ...tagData]);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu thành phố hoặc tags:', error);
            }
        };

        fetchData();
    }, []);

    const handleCityChange = value => {
        setSearch(prev => ({ ...prev, city: value }));
    };

    const handleTagChange = value => {
        setSearch(prev => ({ ...prev, tag: value }));
    };

    const handleSearch = async () => {
        try {
            const allJobs = await getalljob();

            const result = allJobs.filter(job => {
                const cityMatch =
                    !search.city ||
                    search.city === 'Tất cả' ||
                    job.city.includes(search.city);

                const tagMatch =
                    !search.tag ||
                    search.tag === 'Tất cả' ||
                    (Array.isArray(job.tags) &&
                        job.tags.some(tag =>
                            typeof tag === 'string'
                                ? tag === search.tag
                                : tag.value === search.tag
                        ));

                return cityMatch && tagMatch && job.status;
            });
            console.log("r:",result);
            setFilteredJobs(result);
        } catch (error) {
            console.error('Lỗi khi lọc công việc:', error);
        }
    };
    console.log("search:", filteredJobs);
    return (
        <>
        <div className="search-wrapper">
            <h1>Tìm kiếm job phù hợp với bạn</h1>
            <div className="search">
                <div className="search_location">
                    <Select
                        required={true }
                        defaultValue="Chọn địa điểm"
                        onChange={handleCityChange}
                        style={{ width: 200 }}
                        options={city.map(item => ({
                            label: item.value,
                            value: item.value
                        }))}
                    />
                </div>
                <div className="search_tags">
                    <Select
                        required={true}

                        defaultValue="Chọn từ khóa"
                        onChange={handleTagChange}
                        style={{ width: 200 }}
                        options={tags.map(item => ({
                            label: item.value,
                            value: item.value
                        }))}
                    />
                </div>
            </div>
            <Button type="primary" onClick={handleSearch} style={{ marginTop: '16px' }}>
                Tìm kiếm
            </Button>
            <div className="job">
            {filteredJobs.length > 0 ? (
                filteredJobs.map((item, index) => (
                    <Job item={item} key={index} />
                ))
            ) : (
                <h3 style={{ marginTop: '20px' }}>Không có kết quả tìm kiếm</h3>
                )}
            </div>
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

export default SearchJob;
