export interface SettingsResponse {
  showAdminsOnly: boolean;
  showChart: boolean;
  showDataWidget: boolean;
}

export interface SettingDataModel {
  name: string;
  checked: boolean;
}

export interface SettingsModel {
  showAdminsOnly: SettingDataModel;
  showChart: SettingDataModel;
  showDataWidget: SettingDataModel;
}
