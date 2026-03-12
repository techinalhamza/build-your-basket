import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {

  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(`
  {
    metaobjects(type: "basket", first: 10) {
      edges {
        node {
          id
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

  return json(data);
};
