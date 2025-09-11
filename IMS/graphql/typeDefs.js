export const typeDefs = /* GraphQL */ `
  type Product {
    name: String!
    sku: Int!
    description: String
    price: Float!
    category: String!
    manufacturer: [Manufacturer]!
    amountInStock: Int!
  }
  type Manufacturer {
    name: String!
    country: String!
    website: String
    description: String
    address: String!
    contact: [Contact]!
  }
  type Contact {
    name: String!
    email: String!
    phone: String!
  }
`;
