export default {
  api: {
    input: "http://localhost:3000/openapi.json",
    output: {
      mode: "tags",
      target: "./src/__generated__/api/index.ts",
      schemas: "./src/__generated__/api/schemas",
      client: "react-query",
      baseUrl: "/api",
    },
  },
};
