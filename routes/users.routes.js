const express = require('express');

// Controllers
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUsersProducts,
  getAllOrderUser,
  getAOrderUserById
} = require('../controllers/users.controller');

// Middlewares
const { validateSession } = require('../middlewares/auth.middleware');
const {
  userExists,
  protectUserAccount
} = require('../middlewares/users.middleware');

const { orderExists } = require('../middlewares/order.middlewares');

const router = express.Router();

router.post('/', createUser);

router.post('/login', loginUser);

router.use(validateSession);

router.get('/', getAllUsers);

router.get('/me', getUsersProducts);

router.get('/orders', getAllOrderUser);

router.get('/order/:id', orderExists, getAOrderUserById);

router
  .use('/:id', userExists)
  .route('/:id')
  .get(getUserById)
  .patch(protectUserAccount, updateUser)
  .delete(protectUserAccount, deleteUser);

module.exports = { usersRouter: router };
