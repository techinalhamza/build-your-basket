import { authenticate } from "../shopify.server";
import { getMetaobjects } from "../shopify.server";

export const loader = async ({ request }) => {

  const { admin } = await authenticate.admin(request);

  const metaobjects = await getMetaobjects(admin, "basket");

  return new Response(JSON.stringify({ metaobjects }), {
    headers: {
      "Content-Type": "application/json",
    },
  });

};