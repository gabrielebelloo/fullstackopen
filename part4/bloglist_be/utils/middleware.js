const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  let token;
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  } else {
    request.token = null;
  }
  
  next();
}

module.exports = { tokenExtractor };