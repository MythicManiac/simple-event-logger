declare var BACKEND_HOST: string | undefined;

function getApiHost() {
  let api_host = BACKEND_HOST;
  if (!api_host) {
    api_host = `${window.location.protocol}//${window.location.host}`;
  }
  return api_host;
}
export const API_HOST = getApiHost();
