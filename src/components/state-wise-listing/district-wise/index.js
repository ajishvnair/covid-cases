/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { PageHeader, Table } from 'antd';
import { convertStateObjectToArray, searchDistrictByKey } from '../../../common/common-methods';
import Search from '../../custom-components/serach-box';
import './styles.scss';

export default function({ currentState, onBack, covidCases }) {
    // store district data
    const [districtsState, setDistrictState] = useState([]);
    // for searching
    const [keyword, setKeyword] = useState('');

    const stateData = covidCases[currentState];
    // district data
    const { districtData } = stateData;
    // convert object to array
    const districtsArray = convertStateObjectToArray(districtData);

    const backupedDistrictData = useRef(null);

    useEffect(() => {
        setDistrictState(districtsArray);
        backupedDistrictData.current = [...districtsArray];
    }, []);

    const onSerch = value => {
        setKeyword(value);
        const searchedData = searchDistrictByKey(backupedDistrictData.current, value);
        setDistrictState(searchedData);
    };
    // table columns
    const columns = [
        {
            title: 'District',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Confirmed',
            dataIndex: 'confirmed',
            key: 'confirmed'
        },
        {
            title: 'Deseased',
            dataIndex: 'deceased',
            key: 'deceased'
        },
        {
            title: 'Recovered',
            dataIndex: 'recovered',
            key: 'recovered'
        }
    ];
    return (
        <>
            <Search placeholder="Search By District" keyword={keyword} onSearch={onSerch} />
            <PageHeader title={currentState} subTitle="Covid Cases" onBack={onBack} />
            <div className="covid-case__table-container">
                <Table dataSource={districtsState} columns={columns} pagination={false} rowKey={data => data.title} />
            </div>
        </>
    );
}
