import axiosInstance from './axios';

interface IUserSettingType{
    disabilityType: number;
    fontSize: number;
    voiceType: string;
    componentType: string;
}

export async function getUserInfo() {
    const response = await axiosInstance.get('/user/info');
    return response.data;
}

export async function getUserSettings() {
    const response = await axiosInstance.get('/user/custom');
    return response.data;
}

export const postUserSettings = async (settings : IUserSettingType) => {
    const response = await axiosInstance.post('/user/custom', settings);
    return response.data;
};

export const postUserComponentSettings = async (settings : IUserSettingType) => {
    const response = await axiosInstance.patch('/user/custom/edit', settings);
    return response.data;
};
