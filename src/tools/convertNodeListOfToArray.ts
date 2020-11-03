/* eslint-disable arrow-body-style */
const convertNodeListOfToArray = (nodeListOf: NodeListOf<any>) => {
  return Array.prototype.slice.call(nodeListOf);
};

export default convertNodeListOfToArray;
