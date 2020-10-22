/**
 *
 * @param {Object} countryData contains all state data
 * @param {String} state pointier to current state
 */
export const calculateTotalCasesStateWise = (countryData, state) => {
    const stateData = countryData[state];
    const { districtData = [] } = stateData;
    // mapping through each district
    let totalConfirmed = 0;
    let totalDeseased = 0;
    let totalRecovered = 0;
    // looping thr' each district data
    Object.keys(districtData).forEach(key => {
        const district = districtData[key] || {};
        const { confirmed, deceased, recovered } = district;
        // summing all
        totalConfirmed += confirmed;
        totalDeseased += deceased;
        totalRecovered += recovered;
    });

    // returning all values
    return {
        totalConfirmed,
        totalDeseased,
        totalRecovered
    };
};

export const convertStateObjectToArray = districtWiseObject => {
    // loop thr' each keys
    const arrayData = Object.keys(districtWiseObject).map(district => {
        const { confirmed, deceased, recovered } = districtWiseObject[district];
        return {
            title: district,
            confirmed,
            deceased,
            recovered
        };
    });

    return [...arrayData];
};

export const searchStateByKey = (data, keyword) => {
    const newObject = {};
    const alternateKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);
    // loop thr' object
    Object.keys(data).map(state => {
        // if keyword includes then add data to new object
        if (state.includes(keyword) || state.includes(alternateKeyword)) {
            newObject[state] = data[state];
        }
    });
    return newObject;
};
