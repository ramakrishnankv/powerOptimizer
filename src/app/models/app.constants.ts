export const AppConstants = {

  apiResources: {
    login: 'user',
    deviceSchedule: 'DeviceSchedule?userId=',
    device:'device/fullDetails?deviceId=All&userId=',
    deviceDetail:'device/fullDetails?deviceId=',
    deviceEdit:'device?userId=',
    addDevice:'device',
    schedules: 'DeviceSchedule',
    getTemplates: 'Template?userId=',
    getGroups: 'group',
    getAllUser:'user?userId=',
    editUser:'edituser?logedinUserId=',
    addUser:'adduser?logedinUserId=',
    getTemplateNames: 'TemplateNames?userId=',
    deleteTemplateSchedule: 'TemplateSchedule?templateId=',
    addTemplateSchedules: 'TemplateSchedule',
    group: 'group?userId=',
    nonScheduleDevices: 'NonScheduledDevices?userId=',
    scheduledDevices: 'ScheduledDevices?userId=',
    getAllCustomer:'customer?userid=',
    getMasterCustomer:'master/customer?userid=',
    getMasterIssueGroups:'master/issueGroup',
    getMasterGroup:'master/group'
  }

}
