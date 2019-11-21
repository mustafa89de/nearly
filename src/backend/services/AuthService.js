class AuthService {
  compareId(req, res, next) {
    const paramId = req.params.uid;
    const userId = req.user.id;
    if (paramId === userId){
      next();
    } else {
      return res.status(403).json('userId not equal to tokenId')
    }
  }
}

module.exports = new AuthService();