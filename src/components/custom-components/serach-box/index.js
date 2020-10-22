import React from 'react';
import { Input, Row } from 'antd';
import './styles.scss';

const { Search } = Input;

// eslint-disable-next-line react/prop-types
export default function({ keyword, onSearch, placeholder }) {
    const handleSearch = e => {
        onSearch(e.target.value);
    };
    return (
        <Row className="covid-case__search">
            <Search className="search-box" placeholder={placeholder} value={keyword} onChange={handleSearch} />
        </Row>
    );
}
