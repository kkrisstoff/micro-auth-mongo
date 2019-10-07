import getLogger from "../lib/log";

const logErr = getLogger(module).error;

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // TODO: use HttpError
    logErr(`#server error: ${err.status} ${err.message}`);

    // will only respond with JSON
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
}
