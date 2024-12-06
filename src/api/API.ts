
const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

const login = `http://localhost:8000/login.php`;
const fetchAllDepartments = `http://localhost:8000/fetchAllDepartments.php`;
const createDepartment = `http://localhost:8000/createDepartment.php`;
const updateDepartment = `http://localhost:8000/updateDepartment.php`;
const deleteDepartment = `http://localhost:8000/deleteDepartment.php`;
const fetchAllBlogs = `http://localhost:8000/fetchAllBlogs.php`;
const createBlog = `http://localhost:8000/createBlog.php`;
const updateBlog = `http://localhost:8000/updateBlog.php`;
const deleteBlog = `http://localhost:8000/deleteBlog.php`;
const fetchAllAdverts = `http://localhost:8000/fetchAllAdverts.php`;
const createAdvert = `http://localhost:8000/createAdvert.php`;
const updateAdvert = `http://localhost:8000/updateAdvert.php`;
const deleteAdvert = `http://localhost:8000/deleteAdvert.php`;
const fetchAllGallery = `http://localhost:8000/fetchAllGallery.php`;
const createGallery = `http://localhost:8000/createGallery.php`;
const updateGallery = `http://localhost:8000/updateGallery.php`;
const deleteGallery = `http://localhost:8000/deleteGallery.php`;
const fetchAllCouncils = `http://localhost:8000/fetchAllCouncils.php`;
const createCouncil = `http://localhost:8000/createCouncil.php`;
const updateCouncil = `http://localhost:8000/updateCouncil.php`;
const deleteCouncil = `http://localhost:8000/deleteCouncil.php`;
const sendEmail = `http://localhost:8000/sendEmail.php`;



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
    fetchAllGallery,
    createGallery,
    updateGallery,
    deleteGallery,
    fetchAllCouncils,
    createCouncil,
    updateCouncil,
    deleteCouncil,
    sendEmail,
}

export { api };