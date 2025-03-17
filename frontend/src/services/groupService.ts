import axios from "axios";

// backend api url 
const API_URL = "http://localhost:5000/api/groups";

// fetch all groups 
export const getGroups = async() => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching groups: ", error);
        return[];
    }
};

// add new group
export const addGroup = async(groupData: any) => {
    try {
        const response = await axios.post(API_URL, groupData);
        return response.data;
    } catch (error) {
        console.error("Error adding group: ", error);
        throw error;
    }
};

// update will put here later 

// delete group
export const deleteGroup = async(id: string) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting group: ", error);
        throw error;
    }
};