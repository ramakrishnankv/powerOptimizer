export const AppConfigProperties = {

  prefix: 'http://cors-anywhere.herokuapp.com/',
  protocol: 'http://',
  remoteID: '13.127.203.78',
  baseURL: '/StreetLight/api/',
  buildBaseURL: function(apiPath) {
    return `${this.prefix}${this.protocol}${this.remoteID}${this.baseURL}${apiPath}`;
  },
  isServerUp: true
}
