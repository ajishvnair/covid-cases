/* eslint-disable react/prop-types */
import React from 'react';
import { PageHeader, Table } from 'antd';
import { convertStateObjectToArray } from '../../../common/common-methods';
import './styles.scss';

export default function({ currentState, onBack, covidCases }) {
    const stateData = covidCases[currentState];
    // district data
    const { districtData } = stateData;
    // convert object to array
    const districtsArray = convertStateObjectToArray(districtData);

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
            <PageHeader title={currentState} subTitle="Covid Cases" onBack={onBack} />
            <div className="covid-case__table-container">
                <Table dataSource={districtsArray} columns={columns} pagination={false} />
            </div>
        </>
    );
}
