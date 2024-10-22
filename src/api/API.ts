
const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

const login = `${apiUrl}/login.php`;
const fetchAllDepartments = `${apiUrl}/fetchAllDepartments.php`;
const createDepartment = `${apiUrl}/createDepartment.php`;
const updateDepartment = `${apiUrl}/updateDepartment.php`;
const deleteDepartment = `${apiUrl}/deleteDepartment.php`;
const fetchAllBlogs = `${apiUrl}/fetchAllBlogs.php`;
const createBlog = `${apiUrl}/createBlog.php`;
const updateBlog = `${apiUrl}/updateBlog.php`;
const deleteBlog = `${apiUrl}/deleteBlog.php`;
const fetchAllAdverts = `${apiUrl}/fetchAllAdverts.php`;
const createAdvert = `${apiUrl}/createAdvert.php`;
const updateAdvert = `${apiUrl}/updateAdvert.php`;
const deleteAdvert = `${apiUrl}/deleteAdvert.php`;



const api = {
    login,
    fetchAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    fetchAllBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    fetchAllAdverts,
    createAdvert,
    updateAdvert,
    deleteAdvert,
}

export { api };