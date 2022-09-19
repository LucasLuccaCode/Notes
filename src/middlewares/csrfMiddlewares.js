exports.csrfError = (err, req, res, next) => {
  if (err) return res.send("Formulário inválido..")
  next()
}

exports.setCsrfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
}