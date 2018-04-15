export const AppConfigProperties = {

  prefix: 'http://cors-anywhere.herokuapp.com/',
  protocol: 'http://',
  remoteID: '35.154.108.219',
  baseURL: '/StreetLight/api/',
  buildBaseURL: function() {
    return `${this.prefix}${this.protocol}${this.remoteID}${this.baseURL}`;
  },
  isServerUp: true
}
