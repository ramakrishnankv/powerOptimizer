export const AppConfigProperties = {

  prefix: 'http://cors-anywhere.herokuapp.com/',
  protocol: 'http://',
  remoteID: '13.126.122.254',
  baseURL: '/StreetLight/api/',
  buildBaseURL: function(apiPath) {
    return `${this.prefix}${this.protocol}${this.remoteID}${this.baseURL}${apiPath}`;
  },
  isServerUp: true
}
