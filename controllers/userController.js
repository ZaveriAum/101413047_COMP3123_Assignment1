const service = require('../services/userServices')

const signup = async (req, res) => {
    try{
        const user = await service.signup(req.body);
        res.status(201).json({
            status: true,
            user: user,
        });
    }catch(e){
        res.status(400).json({
            status: false,
            message: e.message || "Signup failed. Please try again."
        });
    }
}

const login = async (req, res) => {
    try {
        const { user, token } = await service.login(req.body);

        res.status(200).json({
            status: true,
            user: user,
            token: token,
        });
        
    } catch (e) {
        res.status(400).json({
            status: false,
            message: e.message,
        });
    }
};


const user_info = async (req, res) => {
    try{
        const user = await service.user_info(req.user.email);
        res.status(200).json({
            status: true,
            user: user
        });
    }catch(e){
        res.status(400).json({
            status: false,
            message : e.message,
        });
    }
}

const logout = (req, res) => {
    try {
        const { token, options } = service.logout();
        res.cookie("token", token, options);

        res.status(200).json({
            status: true,
            message: "Logged out successfully",
        });
    } catch (e) {
        res.status(500).json({
            status: false,
            message: e.message || "Logout failed",
        });
    }
}


module.exports = {
    signup,
    login,
    user_info,
    logout
};
