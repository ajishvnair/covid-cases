/* eslint-disable react/prop-types */
import React from 'react';
import { Col } from 'antd';
import { calculateTotalCasesStateWise } from '../../../common/common-methods';

export default function({ data, stateKey }) {
    const { totalConfirmed, totalDeseased, totalRecovered } = calculateTotalCasesStateWise(data, stateKey);
    return (
        <Col span={5}>
            <div>
                <p>{stateKey}</p>
                <p>Total Confirmed: {totalConfirmed}</p>
                <p>Total Diseased: {totalDeseased}</p>
                <p>Total Recovered: {totalRecovered}</p>
            </div>
        </Col>
    );
}
