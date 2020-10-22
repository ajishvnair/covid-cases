/* eslint-disable react/prop-types */
import React from 'react';
import { PageHeader } from 'antd';

export default function({ currentState, onBack }) {
    return (
        <>
            <PageHeader title={currentState} subTitle="Covid Cases" onBack={onBack} />
        </>
    );
}
