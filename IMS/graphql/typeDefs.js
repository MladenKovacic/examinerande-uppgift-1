export const typeDefs = /* GraphQL */ `
  type Product {
    name: String!
    sku: Int!
    description: String
    price: Float!
    category: String!
    manufacturer: Manufacturer!
    amountInStock: Int!
  }
  type Manufacturer {
    name: String!
    country: String!
    website: String
    description: String
    address: String!
    contact: Contact!
  }
  type Contact {
    name: String!
    email: String!
    phone: String!
  }
  type manufacturervalue {
    name: String!
    totalValue: Float!
  }

  # type TSV {
  #   _id: ID
  #   totalStockValue: Float
  # }

  type Query {
    Products: [Product]!
    Manufacturers: [Manufacturer]!
    Contacts: [Contact]!
    totalStockValuebyManufacturer: [manufacturervalue]!
    Product(id: ID!): Product
    totalStockValue: Float!
    lowStockProducts: [Product]!
    criticalProducts: [Product]!
  }

  input addProductInput {
    name: String!
    sku: String!
    description: String!
    price: Float!
    category: String!
    manufacturer: String!
    amountInStock: Int!
  }

  input updateProductInput {
    name: String
    sku: String
    description: String
    price: Float
    category: String
    manufacturer: String
    amountInStock: Int
  }

  type Mutation {
    addProduct(input: addProductInput): Product!
    updateProduct(id: ID!, input: updateProductInput): Product!
    deleteProduct(id: ID!): Product!
  }
`;
