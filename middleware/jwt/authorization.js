const authorizeAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden',
    });
  }
};

const authorizeRequester = (req, res, next) => {
  if (req.user.role === 'requester') {
    next();
  } else {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden',
    });
  }
};

const authorizeContributor = (req, res, next) => {
  if (req.user.role === 'contributor') {
    next();
  } else {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden',
    });
  }
};

const authorizeAdminAndRequester = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'requester') {
    next();
  } else {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden',
    });
  }
};

const authorizeAdminAndContributor = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'contributor') {
    next();
  } else {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden',
    });
  }
};

const authorizeRequesterAndContributor = (req, res, next) => {
  if (req.user.role === 'requester' || req.user.role === 'contributor') {
    next();
  } else {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden',
    });
  }
};
export default {
  authorizeAdmin,
  authorizeRequester,
  authorizeContributor,
  authorizeAdminAndRequester,
  authorizeAdminAndContributor,
  authorizeRequesterAndContributor,
};
