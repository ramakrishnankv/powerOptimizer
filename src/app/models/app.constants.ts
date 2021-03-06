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
    getMasterGroup:'master/group',
    powerConsumptionGraph:'PowerConsumptionGraph?userid=',
    dashBoard:'dashboard?UserId=',
    dashboard: 'dashboard?UserId=',
    manageGroup:'group',
    deleteGroup:'group?groupid=',
    unassignedGroup:'group?deviceids=',
    emptyGroup:'group/emptyGroup?userid=',
    nondevice:'device/nonGroupDevices?userId=',
    Issue:'Issue',
    updateProfileImage:'file/updateProfileImage?userId='

  }

}
