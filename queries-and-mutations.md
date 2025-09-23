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
query {
  Products {
    name
    sku
    description
    price
    category
    amountInStock
    manufacturer {
      name
      country
      contact {
        name
        email
        phone
      }
    }
  }
}
```

### product(id: ID!)

```graphql
query {
  Product(id: "PRODUCT_ID_HERE") {
    name
    price
    amountInStock
    manufacturer {
      name
    }
  }
}
```

### totalStockValue

```graphql
query {
  totalStockValue
}
```

### totalStockValueByManufacturer

```graphql
query {
  totalStockValuebyManufacturer {
    name
    totalValue
  }
}
```

### lowStockProducts

```graphql
query {
  lowStockProducts {
    name
    amountInStock
    manufacturer {
      name
    }
  }
}
```

### criticalStockProducts

```graphql
query {
  criticalProducts {
    name
    amountInStock
    manufacturer {
      name
      contact {
        name
        email
      }
    }
  }
}
```

### manufacturers

```graphql
query {
  Manufacturers {
    name
    country
    website
    contact {
      name
      email
    }
  }
}
```

### contacts
```graphql
query {
  Contacts {
    name
    email
    phone
  }
}
```

## Mutations

### addProduct

```graphql
mutation {
  addProduct(
    input: {
      name: "Wireless Mouse"
      sku: "WM123"
      description: "Ergonomic wireless mouse"
      price: 29.99
      category: "Electronics"
      manufacturer: "MANUFACTURER_ID_HERE"
      amountInStock: 150
    }
  ) {
    name
    sku
    price
    amountInStock
  }
}
```

### updateProduct

```graphql
mutation {
  updateProduct(
    id: "PRODUCT_ID_HERE"
    input: {
      price: 24.99
      amountInStock: 200
    }
  ) {
    name
    price
    amountInStock
  }
}
```

### deleteProduct

```graphql
mutation {
  deleteProduct(id: "PRODUCT_ID_HERE") {
    name
    sku
  }
}
```
