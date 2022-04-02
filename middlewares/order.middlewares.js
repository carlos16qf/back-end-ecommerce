const { Product } = require('../models/product.model');
const { User } = require('../models/user.model');
const { Order } = require('../models/order.model');
const { Cart } = require('../models/cart.model');

const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

exports.orderExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: { id, status: 'active' },
    include: [
      { model: User, attributes: { exclude: ['password'] } },
      {
        model: Cart,
        include: [
          {
            model: Product,
            through: { where: { status: 'purchaser' } }
          }
        ]
      }
    ]
  });

  if (!order) {
    return next(new AppError(404, 'No order found with that ID'));
  }

  req.order = order;
  next();
});
