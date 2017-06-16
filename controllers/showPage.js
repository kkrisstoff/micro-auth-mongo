import getLogger from "../lib/log";

const logger = getLogger(module);
const log = logger.debug;

async function showPage(page, data, ctx) {
  log(page);
  const pageName = `${page}.ejs`;

  ctx.state = {
    session: "session",
    title: "app"
  };

  await ctx.render(pageName, data);
}

export default showPage;
