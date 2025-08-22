# 🎯 MongoDB Data Insertion & Testing Guide

This guide will teach you how to insert data into MongoDB and test your GraphQL queries and mutations in your ticket-booking backend.

## 📋 Table of Contents

1. [Understanding Your Setup](#understanding-your-setup)
2. [3 Ways to Insert Data](#3-ways-to-insert-data)
3. [Running Tests](#running-tests)
4. [GraphQL Queries & Mutations](#graphql-queries--mutations)
5. [Best Practices](#best-practices)

## 🏗️ Understanding Your Setup

Your project has:
- **MongoDB** connected via Mongoose
- **GraphQL** API with queries and mutations
- **User model** with fields: email, password, fullName, role, phone, etc.
- **Jest** for testing with proper folder structure

## 🚀 3 Ways to Insert Data

### Method 1: Direct MongoDB Insertion (Development/Testing)

```typescript
// Using the utility functions in src/utils/seed-data.ts
import { insertUserDirectly } from '../utils/seed-data';

const user = await insertUserDirectly();
console.log('User created:', user);
```

**When to use:** Development, testing, seeding data

### Method 2: Batch Insertion (Seeding)

```typescript
// Insert multiple users at once
import { seedUsers } from '../utils/seed-data';

const users = await seedUsers();
console.log('Created', users.length, 'users');
```

**When to use:** Initial data setup, testing with multiple records

### Method 3: GraphQL Mutations (Production)

```graphql
# Create a user via GraphQL
mutation CreateUser {
  createUser(
    fullName: "John Doe"
    email: "john@example.com"
    password: "password123"
    role: "USER"
    phone: "+1234567890"
  ) {
    _id
    fullName
    email
    role
    createdAt
  }
}
```

**When to use:** Production applications, client-side operations

## 🧪 Running Tests

### 📁 Test Folder Structure
```
specs/
├── resolvers/
│   ├── queries/
│   │   └── user/
│   │       ├── get-user.spec.ts
│   │       └── get-users.spec.ts
│   └── mutations/
│       └── user/
│           ├── create-user.spec.ts
│           ├── update-user.spec.ts
│           └── delete-user.spec.ts
```

### 1. Run All Tests
```bash
npx nx test ticket-booking-backend
```

### 2. Run Specific Test File
```bash
npx nx test ticket-booking-backend --testPathPattern=get-user.spec.ts
```

### 3. Run Tests by Category
```bash
# Run all query tests
npx nx test ticket-booking-backend --testPathPattern=queries

# Run all mutation tests
npx nx test ticket-booking-backend --testPathPattern=mutations

# Run all user tests
npx nx test ticket-booking-backend --testPathPattern=user
```

### 4. Run Tests in Watch Mode
```bash
npx nx test ticket-booking-backend --watch
```

### 5. Run Demo Script
```bash
# Run the demo script
node demo.js
```

## 📊 Test Categories

### 1. Query Tests (`specs/resolvers/queries/user/`)
- ✅ **get-user.spec.ts**: Get user by ID
- ✅ **get-users.spec.ts**: Get all users

### 2. Mutation Tests (`specs/resolvers/mutations/user/`)
- ✅ **create-user.spec.ts**: Create new user
- ✅ **update-user.spec.ts**: Update existing user
- ✅ **delete-user.spec.ts**: Delete user

### 3. Test Coverage
Each test file covers:
- ✅ Success cases
- ❌ Error cases
- 🔍 Data validation
- ⚡ Performance considerations

## 🔍 GraphQL Queries & Mutations

### Queries

#### Get All Users
```graphql
query GetUsers {
  getUsers {
    _id
    fullName
    email
    role
    phone
    createdAt
  }
}
```

#### Get User by ID
```graphql
query GetUser($id: ID!) {
  getUser(_id: $id) {
    _id
    fullName
    email
    role
    phone
    createdAt
  }
}
```

### Mutations

#### Create User
```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(
    fullName: $input.fullName
    email: $input.email
    password: $input.password
    role: $input.role
    phone: $input.phone
  ) {
    _id
    fullName
    email
    role
    createdAt
  }
}
```

#### Update User
```graphql
mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(
    _id: $id
    fullName: $input.fullName
    email: $input.email
    role: $input.role
    phone: $input.phone
  ) {
    _id
    fullName
    email
    role
    updatedAt
  }
}
```

#### Delete User
```graphql
mutation DeleteUser($id: ID!) {
  deleteUser(_id: $id) {
    _id
    fullName
    email
  }
}
```

## 🛠️ Testing Your API

### 1. Start the Development Server
```bash
npx nx serve ticket-booking-backend
```

### 2. Open GraphQL Playground
Navigate to: `http://localhost:3000/api/graphql`

### 3. Test Queries and Mutations

#### Example: Create and Query Users
```graphql
# Step 1: Create a user
mutation {
  createUser(
    fullName: "Alice Johnson"
    email: "alice@example.com"
    password: "secure123"
    role: "USER"
    phone: "+1234567890"
  ) {
    _id
    fullName
    email
    role
    createdAt
  }
}

# Step 2: Get all users
query {
  getUsers {
    _id
    fullName
    email
    role
    createdAt
  }
}
```

## 📝 Best Practices

### 1. Data Validation
- Always validate input data
- Use Mongoose schemas for type safety
- Handle errors gracefully

### 2. Testing
- Test both success and failure cases
- Clean up data after tests
- Use descriptive test names
- Follow the proper folder structure: `specs/resolvers/{queries|mutations}/{model}/`

### 3. Performance
- Use indexes for frequently queried fields
- Batch operations when possible
- Monitor query performance

### 4. Security
- Hash passwords before storing
- Validate email formats
- Use environment variables for sensitive data

## 🔧 Troubleshooting

### Common Issues

1. **Connection Error**
   - Check MongoDB URI in environment variables
   - Ensure MongoDB is running

2. **Schema Validation Error**
   - Run codegen after schema changes: `npx nx codegen ticket-booking-backend`
   - Check field names match between schema and model

3. **Test Failures**
   - Ensure database is clean before tests
   - Check for duplicate email constraints
   - Verify test folder structure matches: `specs/resolvers/...`

### Debug Commands

```bash
# Check database connection
npx nx serve ticket-booking-backend

# Run tests with verbose output
npx nx test ticket-booking-backend --verbose

# Check generated types
npx nx codegen ticket-booking-backend

# Run specific test file
npx nx test ticket-booking-backend --testPathPattern=create-user.spec.ts
```

## 🎉 Next Steps

1. **Add more models** (Events, Tickets, Payments)
2. **Create relationships** between models
3. **Add authentication** and authorization
4. **Implement business logic** for ticket booking
5. **Add more comprehensive tests** following the same folder structure

---

**Need help?** Check the test files in `specs/resolvers/` and demo script for working examples!
