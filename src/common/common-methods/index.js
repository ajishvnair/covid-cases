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