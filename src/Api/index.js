import axios from 'axios'


const Base_Url = `${process.env.REACT_APP_DNS_API_PREFETCH_URL}/api/1.0/`;

const Instance1 = () => {
    return axios.create({
        accept: ' application/json',
        baseURL: Base_Url,
        timeout: 60000,
    });
}
const Instance = () => {
    const token=localStorage.getItem('access_token')
    console.log('Token',token)
   
    return axios.create({
        headers: {"Authorization" : `Bearer ${token}`,
        'Content-Type':'application/json'
        
    },
        // headers: {'Authorization':`${token}`},
        accept: ' application/json',
        baseURL: Base_Url,
        timeout: 60000,
        

    });
}



const collegeList = () => {
    const instance = Instance();
    return instance.get(`college`);
};
const signUp = (data) => {
    const instance = Instance1();
    return instance.post(`user`,data);
};
const updateActivity = (id,data) => {
    const instance = Instance();
    return instance.put(`activity/${id}`,data);
};

const login = (data) => {
    const instance = Instance1();
    return instance.post(`login`,data);
};
const resetpswd = (email,data) => {
    const instance = Instance1();
    return instance.post(`forget-password/${email}`,data);
};

const createactivity = (data) => {
    const instance = Instance();
    return instance.post(`activity`,data);
};

const getActivity = (page) => {
    const instance = Instance();
    return instance.get(`activity?page=${page}&limit=10`);
};
const getOneActivity = (activityId) => {
    const instance = Instance();
    return instance.get(`activity/${activityId}`);
};

const joinedActivityparticipant = (activityId,data) => {
    const instance = Instance();
    return instance.post(`participate/${activityId}`,data);
};
const ditachActivitybyadmin = (activityId,userid) => {
    const instance = Instance();
    return instance.delete(`participate/${activityId}/${userid}`);
};
const deleteActivity = (activityId) => {
    const instance = Instance();
    return instance.delete(`activity/${activityId}`);
};
const joined_activity_list = (UserId) => {
    const instance = Instance();
    return instance.get(`activity/user/${UserId}`);
};
const room_initiate = (data) => {
    const instance = Instance();
    return instance.post(`room/initiate`,data);
};

const getgroupchat = (roomId,massage) => {
    const instance = Instance();
    return instance.get(`room/${roomId}`);
};
const groupchat = (roomId,data) => {
    const instance = Instance();
    return instance.post(`room/${roomId}/message`,data);
};
const deletChat = (messageId) => {
    const instance = Instance();
    return instance.delete(`message/${messageId}`);
};
const uploadImg = (data) => {
    const instance = Instance();
    return instance.post(`ckeditor-gallery-upload/`,data);
};







export default {
    signUp,
    login,
    createactivity,
    getActivity,
    ditachActivitybyadmin,
    collegeList,
    resetpswd,
    updateActivity,
    getOneActivity,
    deleteActivity,
    joinedActivityparticipant,
    joined_activity_list,
    room_initiate,
    groupchat,
    getgroupchat,
    deletChat,
    uploadImg
   
}
