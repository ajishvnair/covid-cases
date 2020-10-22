/* eslint-disable react/prop-types */
import React from 'react';
import './styles.scss';

export default function({ keyword }) {
    return (
        <div className="covide-cases__empty">
            <p className="title">{`Oops no state exist for "${keyword}"`}</p>
        </div>
    );
}
