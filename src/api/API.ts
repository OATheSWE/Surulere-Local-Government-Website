
const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

const login = `php/login.php`;
const fetchAllDepartments = `php/fetchAllDepartments.php`;
const createDepartment = `php/createDepartment.php`;
const updateDepartment = `php/updateDepartment.php`;
const deleteDepartment = `php/deleteDepartment.php`;
const fetchAllBlogs = `php/fetchAllBlogs.php`;
const createBlog = `php/createBlog.php`;
const updateBlog = `php/updateBlog.php`;
const deleteBlog = `php/deleteBlog.php`;
const fetchAllAdverts = `php/fetchAllAdverts.php`;
const createAdvert = `php/createAdvert.php`;
const updateAdvert = `php/updateAdvert.php`;
const deleteAdvert = `php/deleteAdvert.php`;
const fetchAllGallery = `php/fetchAllGallery.php`;
const createGallery = `php/createGallery.php`;
const updateGallery = `php/updateGallery.php`;
const deleteGallery = `php/deleteGallery.php`;
const fetchAllCouncils = `php/fetchAllCouncils.php`;
const createCouncil = `php/createCouncil.php`;
const updateCouncil = `php/updateCouncil.php`;
const deleteCouncil = `php/deleteCouncil.php`;
const sendEmail = `php/sendEmail.php`;



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