export const fetchWrapper = (url: string, method = 'GET', data?: any) => {
  const fetchConfig: any = {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'GET,PUT,POST',
    },
    credentials: 'omit',
    cache: 'no-cache',
    mode: 'cors',
  };
  return fetch(url, fetchConfig)
    .then(result => {
      if (result.status === 200) {
        return result.json();
      }
      throw new Error('Issue in API call');
    })
    .catch(error => Promise.reject(error));
};