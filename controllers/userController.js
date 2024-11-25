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

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 3600000, 
        });

        res.status(200).json({
            status: true,
            user: user,
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
    try{
        const {token, option} = service.logout();
        res.cookie("token", token, option);

        res.status(200).json({
            status: true,
            message: "Logged out successfully"
        });
    }catch(e){
        res.status(500).json({
            status: false,
            message: e.message
        });
    }
}

module.exports = {
    signup,
    login,
    user_info,
    logout
};
