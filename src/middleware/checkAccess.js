// import { HttpError } from '../error';

export default function(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
    // return next(new HttpError(401, "You aren't authorized."));
  }
  return next();
};
