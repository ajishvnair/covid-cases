/* eslint-disable handle-callback-err */
import React, { useState, useEffect } from 'react';
import http from '../../common/httpProvider/httpProvider';
import Loader from '../../common/loader/ant-loader';
import { calculateTotalCasesStateWise } from '../../common/common-methods';

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
        Object.keys(covidCases).map(key => (
            <p key={key}>{`${key} - ${JSON.stringify(calculateTotalCasesStateWise(covidCases, key))}`}</p>
        ))
    ) : (
        <Loader />
    );
}
