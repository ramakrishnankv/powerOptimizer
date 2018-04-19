export const AppConfigProperties = {

  prefix: 'http://cors-anywhere.herokuapp.com/',
  protocol: 'http://',
  remoteID: '35.154.255.10',
  baseURL: '/StreetLight/api/',
  buildBaseURL: function(apiPath) {
    return `${this.prefix}${this.protocol}${this.remoteID}${this.baseURL}${apiPath}`;
  },
  isServerUp: true
}
