import { authenticate } from "../shopify.server";

export async function loader({ request }) {

  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(`
    {
      metaobjects(first: 10, type: "basket") {
        edges {
          node {
            id
            handle
            fields {
              key
              value
            }
          }
        }
      }
    }
  `);

  const data = await response.json();

  return new Response(JSON.stringify(data.data.metaobjects.edges), {
    headers: {
      "Content-Type": "application/json",
    },
  });

}