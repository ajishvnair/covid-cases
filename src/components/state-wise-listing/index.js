/* eslint-disable handle-callback-err */
import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import http from '../../common/httpProvider/httpProvider';
import Loader from '../../common/loader/ant-loader';
import Card from '../custom-components/card';
import './styles.scss';

export default function() {
    // for string covid case details
    const [covidCases, setCovidCases] = useState([]);
    // to show loader
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetch covid details
        http.getAction('https://api.covid19india.org/state_district_wise.json')
            .then(res => {
                setCovidCases(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }, []);

    return !loading ? (
        <Row justify="space-around">
            {Object.keys(covidCases).map(key => (
                <Card key={key} stateKey={key} data={covidCases} />
            ))}
        </Row>
    ) : (
        <Loader />
    );
}
