import { authenticate } from "../shopify.server";

export const loader = async ({request}) => {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(
    `#graphql
query GetMetaobjects {
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
}`,
  );
  const json = await response.json();
  return json.data;
}