const AdminService = require("../services/admin.service");


// 랜더링 용
class AdminControllerRender {
    adminservice = new AdminService();

    get_page_admin_user = async (req, res) => {
        res.render("admin/manage-user");
    };

    get_page_lectures = async (req, res) => {
        res.render("admin/manage-lecture");
    };

    get_page_add_lecture = async (req, res) => {
        res.render("admin/add-lecture");
    }
}

// api 용
class AdminControllerApi {
    adminservice = new AdminService();

    add_admin_user = async (req, res) => {

    };

    get_lectures = async (req, res) => {

    };

    update_lecture = async (req, res) => {

    };

    remove_lecture = async (req, res) => {

    };

    add_lecture = async (req, res) => {

    };
}



module.exports = { AdminControllerRender, AdminControllerApi };