const createSchemaCustomization = async ({ actions, schema }) => {
  const { createTypes } = actions;
  createPupularPage();
  // `IPopularPage` と `PopularPage` を作成する
  function createPupularPage() {
    createTypes(`
      interface IPopularPage @nodeInterface {
        id: ID!
        path: String!
        title: String!
        count: Int!
      }
    `);
    createTypes(
        schema.buildObjectType({
          name: `PopularPage`,
          fields: {
            id: { type: `ID!` },
            path: { type: `String!` },
            title: { type: `String!` },
            count: { type: `Int!` },
          },
          interfaces: [`Node`, `IPopularPage`],
        })
    )
  }
};

module.exports = createSchemaCustomization;
