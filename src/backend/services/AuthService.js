class AuthService {
  compareId(req, res, next) {
    const paramId = req.params.id;
    const userId = req.user.id;
    if (paramId === userId) {
      next();
    } else {
      return res.status(403).json('userId not equal to tokenId')
    }
  }

  compareHostId(req, res, next) {
    const hostId = req.body.hostId;
    const userId = req.user.id;
    if(hostId === userId) {
      next();
    } else {
      return res.status(403).json('userId not equal to hostId')
    }
  }
}

module.exports = new AuthService();