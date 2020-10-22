/* eslint-disable handle-callback-err */
import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import http from '../../common/httpProvider/httpProvider';
import Loader from '../../common/loader/ant-loader';
import Card from '../custom-components/card';
import DistrictWise from './district-wise';
import Header from '../templates/Header';
import './styles.scss';

export default function() {
    // for string covid case details
    const [covidCases, setCovidCases] = useState([]);
    // to show loader
    const [loading, setLoading] = useState(true);
    // to toggle between window
    const [window, setWindow] = useState('state-wise');
    // to get seletected state
    const [currentState, setCurrentState] = useState(null);

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

    const toggleBack = () => {
        setWindow('state-wise');
    };
    // handle each card click
    const handleCardClick = state => {
        setCurrentState(state);
        setWindow('district-wise');
    };
    // render window
    const getContent = () => {
        switch (window) {
            case 'state-wise':
                return (
                    <Row justify="space-around">
                        {Object.keys(covidCases).map(key => (
                            <Card key={key} stateKey={key} data={covidCases} onClick={handleCardClick} />
                        ))}
                    </Row>
                );
            case 'district-wise':
                return <DistrictWise currentState={currentState} onBack={toggleBack} covidCases={covidCases} />;
            default:
                break;
        }
    };

    return !loading ? (
        <>
            <Header />
            {getContent()}
        </>
    ) : (
        <Loader />
    );
}
