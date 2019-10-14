export async function showPage(page, data, ctx) {
  const pageName = `${page}.ejs`;

  ctx.state = {
    session: "session",
    title: "app"
  };

  await ctx.render(pageName, data);
}
