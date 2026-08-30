export default async (request, context) => {
  const user = Deno.env.get("SITE_AUTH_USER");
  const pass = Deno.env.get("SITE_AUTH_PASS");

  if (user && pass) {
    const authHeader = request.headers.get("authorization");
    const expected = "Basic " + btoa(`${user}:${pass}`);

    if (authHeader !== expected) {
      return new Response("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Restricted"',
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    }
  }

  const response = await context.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  const banner = `
<div id="staging-banner" style="position:sticky;top:0;z-index:9999;background:#b71c1c;color:#fff;text-align:center;padding:8px 12px;font-family:sans-serif;font-size:14px;">
  This is a STAGING site for testing purposes only — not the live site.
</div>`;

  let html = await response.text();
  html = html.replace(/<body([^>]*)>/i, `<body$1>${banner}`);

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  });
};
