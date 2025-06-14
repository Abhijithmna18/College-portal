// middleware/authMiddleware.js

const protect = (req, res, next) => {
    console.log('Middleware working ✅');
    next();
};

const adminOnly = (req, res, next) => {
    console.log('Admin only middleware accessed');
    next();
};

module.exports = { protect, adminOnly };

