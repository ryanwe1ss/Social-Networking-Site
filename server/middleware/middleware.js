const { allRoutes, adminRoutes, userRoutes } = require("./allowed-routes");

const middleware = (request, result, next) => {
  const requestType = request.session.user ? request.session.user.type : null;

  if (requestType && allRoutes.some((route) => request.url.includes(route))) {
    return next();
  }

  if (requestType === "admin" && adminRoutes.some((route) => request.url.includes(route))) {
    return next();
  }

  if (requestType === "user" && userRoutes.some((route) => request.url.includes(route))) {
    return next();
  }
  result.sendStatus(401);
};

module.exports = { middleware };