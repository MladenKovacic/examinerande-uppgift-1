# Queries and mutations

Add your queries and mutations here.
A tip is to use [GraphQL Formatter](https://jsonformatter.org/graphql-formatter) to format them to make them easier to read.

## This is an example

```graphql
mutation {
  addSale(
    saleDate: "1427144809506"
    items: [
      {
        name: "printer paper"
        tags: ["office", "stationary"]
        price: 40.01
        quantity: 2
      }
    ]
    storeLocation: "Denver"
    customer: {
      gender: "M"
      age: 42
      email: "cauhowitwuta.sv"
      satisfaction: 4
    }
    couponUsed: true
    purchaseMethod: "Online"
  ) {
    id
  }
}
```

## Queries

### products

```graphql
// query Query {
  Products {
    name
    manufacturer {
      name
      contact {
        name
      }
    }
  }
}
```

### product(id: ID!)

```graphql
// query Query($productId: ID!) {
  Product(id: $productId) {
    name
  }
}/
Variables:
{
  "productId": "68c9431dfac9702e194f2d58"
}
```

### totalStockValue

```graphql
// query Query {
  totalStockValue
}
/mutation here
```

### totalStockValueByManufacturer

```graphql
// query Query {
  totalStockValuebyManufacturer {
    totalValue
    name
  }
}
/mutation here
```

### lowStockProducts

```graphql
// query Query {
  lowStockProducts {
    price
    name
    amountInStock
  }
}
/mutation here
```

### criticalStockProducts

```graphql
// query Query {
  criticalProducts {
    amountInStock
    name
    price
  }
}
/mutation here
```

### manufacturers

```graphql
query Query {
  Manufacturers {
    _id
    name
    country
    website
    description
    address
    contact {
      _id
      name
      email
      phone
    }
  }
}
```

## Mutations

### addProduct

```graphql
mutation Mutation($input: addProductInput) {
  addProduct(input: $input) {
    _id
    name
    sku
    description
    price
    category
    manufacturer {
      _id
      name
      country
      website
      description
      address
      contact {
        _id
        name
        email
        phone
      }
    }
    amountInStock
  }
}
```

### updateProduct

```graphql
mutation Mutation($updateProductId: ID!, $input: updateProductInput) {
  updateProduct(id: $updateProductId, input: $input) {
    _id
    amountInStock
    category
    description
    manufacturer {
      website
      name
      description
      country
      contact {
        _id
        email
        name
        phone
      }
      address
      _id
    }
    name
    price
    sku
  }
}
```

### deleteProduct

```graphql
mutation Mutation($deleteProductId: ID!) {
  deleteProduct(id: $deleteProductId)
}
```
