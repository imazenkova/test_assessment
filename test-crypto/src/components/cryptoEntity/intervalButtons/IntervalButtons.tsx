import React, { useState } from 'react';
import style from '../../../pages/EntityDetailsPage/EntityDetailsPage.module.scss';
import { Interval } from '../../../types/ApiTypes';

interface IntervalButtonsProps {
    onIntervalChange: (interval: Interval) => void;
}

const IntervalButtons: React.FC<IntervalButtonsProps> = ({ onIntervalChange }) => {
    const [selectedInterval, setSelectedInterval] = useState<Interval>("h1");
    const handleIntervalChange = (interval: Interval) => {
        onIntervalChange(interval);
        setSelectedInterval(interval)
    };

    return (
        <div className={style.interval_buttons}>
            <button
                className={`${style.interval_button} ${selectedInterval === 'h1' && style.selected}`}
                onClick={() => handleIntervalChange('h1')}
            >
                1 Hour
            </button>
            <button
                className={`${style.interval_button} ${selectedInterval === 'h12' && style.selected}`}
                onClick={() => handleIntervalChange('h12')}
            >
                12 Hours
            </button>
            <button
                className={`${style.interval_button} ${selectedInterval === 'd1' && style.selected}`}
                onClick={() => handleIntervalChange('d1')}
            >
                1 Day
            </button>
        </div>
    );
};

export default IntervalButtons;