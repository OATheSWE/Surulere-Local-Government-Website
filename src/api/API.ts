
const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

const login = `${apiUrl}/login.php`;
const fetchAllDepartments = `${apiUrl}/fetchAllDepartments.php`;
const createDepartment = `${apiUrl}/createDepartment.php`;
const updateDepartment = `${apiUrl}/updateDepartment.php`;
const deleteDepartment = `${apiUrl}/deleteDepartment.php`;




const api = {
    login,
    fetchAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
}

export { api };