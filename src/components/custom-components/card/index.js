/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Typography, Tag } from 'antd';
import { calculateTotalCasesStateWise } from '../../../common/common-methods';
import './styles.scss';

const { Title } = Typography;

export default function({ data, stateKey, onClick }) {
    const { totalConfirmed, totalDeseased, totalRecovered } = calculateTotalCasesStateWise(data, stateKey);
    return (
        <Col className="covid__ant-column" onClick={() => onClick(stateKey)}>
            <div>
                <Title level={4}>{stateKey}</Title>
                <p>
                    Total Confirmed: <Tag color="red">{totalConfirmed}</Tag>
                </p>
                <p>
                    Total Deseased: <Tag>{totalDeseased}</Tag>
                </p>
                <p>
                    Total Recovered: <Tag color="green">{totalRecovered}</Tag>
                </p>
            </div>
        </Col>
    );
}
