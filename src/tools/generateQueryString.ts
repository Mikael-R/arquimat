interface IQueryParams {
  [key: string]: boolean | string | string[];
}

const generateQueryString = (params: IQueryParams) => {
  const paramsAnArray = Object.entries(params);
  let queryString = '';

  paramsAnArray.forEach(([key, value]) => {
    if (typeof value === 'string' || typeof value === 'boolean') {
      queryString += `&${key}=${encodeURIComponent(value)}`;
    } else if (Array.isArray(value)) {
      value.forEach(vl => {
        queryString += `&${key}=${encodeURIComponent(vl)}`;
      });
    }
  });

  return queryString;
};

export default generateQueryString;
