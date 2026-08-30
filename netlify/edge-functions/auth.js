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
  return response;
};
