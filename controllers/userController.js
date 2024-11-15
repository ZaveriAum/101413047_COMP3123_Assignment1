const service = require('../services/userServices')

// creating user from the given data in the body
const signup = async (req, res) => {
    try{
        const user = await service.signup(req.body);
        res.status(201).json({
            status: "successful",
            message: "User signed successful",
            user: user,
        });
    }catch(e){
        res.status(400).json({
            status: "unsuccessful",
            title: e.title,
            message: e.message
        });
    }
}

// logining into the server from the given data in the body
const login = async (req, res) => {
    try {
        const { user, token } = await service.login(req.body);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000, 
        });

        res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            user: user,
        });
    } catch (e) {
        res.status(400).json({
            status: "unsuccessful",
            title: e.title || "Login Failed",
            message: e.message,
        });
    }
};


// for jwt validations user_info function
const user_info = async (req, res) => {
    try{
        const user = await service.user_info(req.user.email);
        res.status(200).json({
            status: "success",
            user: user
        });
    }catch(e){
        res.status(400).json({
            status: "unsuccessful",
            title : e.title,
            message : e.message,
        });
    }
}

const logout = (req, res) => {
    try{
        const {token, option} = service.logout();
        res.cookie("token", token, option);

        res.status(200).json({
            status: "success",
            message: "Logged out successfully"
        });
    }catch(e){
        res.status(500).json({
            status: "unsuccessful",
            title: e.title,
            message: e.message
        });
    }
}

// exporting all the function to the routes
module.exports = {
    signup,
    login,
    user_info,
    logout
};
