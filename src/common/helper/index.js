/* Check if an object is empty */
export const isEmpty = a => (a ? Object.keys(a || {}).length === 0 : true);
