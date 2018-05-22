export const AppConstants = {

  apiResources: {
    login: 'user',
    deviceSchedule: 'DeviceSchedule?userId=',
    device:'Device/fullDetails?deviceId=All&userId=',
    deviceDetail:'Device/fullDetails?deviceId=',
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
    getMasterCustomer:'mastercustomers?userid=',
  }

}
