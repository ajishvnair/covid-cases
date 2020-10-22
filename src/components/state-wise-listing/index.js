/* eslint-disable handle-callback-err */
import React, { useState, useEffect, useRef } from 'react';
import { Row } from 'antd';
import { searchStateByKey } from '../../common/common-methods';
import { isEmpty } from '../../common/helper';
import http from '../../common/httpProvider/httpProvider';
import Loader from '../../common/loader/ant-loader';
import Card from '../custom-components/card';
import DistrictWise from './district-wise';
import Header from '../templates/Header';
import Search from '../custom-components/serach-box';
import EmptyState from '../custom-components/empty-state';
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
    // search text
    const [keyword, setKeyword] = useState('');
    // backup covid data
    const backupCovidData = useRef(null);

    useEffect(() => {
        // fetch covid details
        http.getAction('https://api.covid19india.org/state_district_wise.json')
            .then(res => {
                setCovidCases(res.data);
                setLoading(false);
                backupCovidData.current = res.data;
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

    // handle search
    const onSearch = value => {
        setKeyword(value);
        const searchedData = searchStateByKey(backupCovidData.current, value);
        setCovidCases(searchedData);
    };

    // render window
    const getContent = () => {
        switch (window) {
            case 'state-wise':
                return (
                    <>
                        <Search placeholder="Search By State" keyword={keyword} onSearch={onSearch} />
                        <Row justify="space-around">
                            {!isEmpty(covidCases) ? (
                                Object.keys(covidCases).map(key => (
                                    <Card key={key} stateKey={key} data={covidCases} onClick={handleCardClick} />
                                ))
                            ) : (
                                <EmptyState keyword={keyword} />
                            )}
                        </Row>
                    </>
                );
            case 'district-wise':
                return <DistrictWise currentState={currentState} onBack={toggleBack} covidCases={covidCases} />;
            default:
                break;
        }
    };

    return (
        <>
            <Header />
            {!loading ? getContent() : <Loader />}
        </>
    );
}
