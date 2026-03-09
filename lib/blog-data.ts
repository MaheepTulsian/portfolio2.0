export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  readTime: string;
  description: string;
  tag: "NEW" | "UPDATED" | null;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Setting up a MonoRepo from Scratch",
    slug: "monorepo-setup",
    date: "2026-01-18",
    readTime: "15 min",
    description:
      "A blog on monorepos, their benefits and how to set up one from scratch",
    tag: "NEW",
    content: `
# Setting up a MonoRepo from Scratch

A comprehensive guide to understanding monorepos and setting one up from scratch.

## What is a MonoRepo?

A monorepo (monolithic repository) is a software development strategy where code for many projects is stored in the same repository. This approach has gained popularity among major tech companies like Google, Facebook, and Microsoft.

## Benefits of MonoRepos

### 1. Code Sharing and Reusability
- Shared libraries and utilities can be easily accessed across projects
- Reduces code duplication
- Ensures consistency across applications

### 2. Atomic Commits
- Changes across multiple projects can be made in a single commit
- Easier to maintain consistency across dependent projects
- Simplified versioning

### 3. Simplified Dependency Management
- All dependencies are managed in one place
- Easier to update shared dependencies
- Reduces version conflicts

## Setting Up a MonoRepo

### Step 1: Choose Your Tool

Popular monorepo tools include:
- **Turborepo**: Fast, modern build system
- **Nx**: Powerful and extensible
- **Lerna**: Classic choice for JavaScript projects
- **Yarn Workspaces**: Built into Yarn
- **pnpm Workspaces**: Efficient disk space usage

### Step 2: Project Structure

\`\`\`
my-monorepo/
├── apps/
│   ├── web/
│   ├── mobile/
│   └── api/
├── packages/
│   ├── ui/
│   ├── utils/
│   └── config/
├── package.json
└── turbo.json
\`\`\`

### Step 3: Configuration

Configure your chosen tool and set up scripts for building, testing, and linting across all packages.

## Best Practices

1. **Keep packages small and focused**
2. **Use a consistent coding style**
3. **Implement comprehensive CI/CD**
4. **Document your structure**
5. **Use caching effectively**

## Conclusion

Monorepos can significantly improve development workflow when properly implemented. Start small and gradually migrate projects as you become comfortable with the setup.
    `.trim(),
  },
  {
    title: "Production Ready REST APIs in a Monolithic Architecture",
    slug: "rest-apis-monolithic",
    date: "2025-12-25",
    readTime: "10 min",
    description:
      "A blog on the basics of REST APIs and how to structure them in a production ready monolithic backend architecture.",
    tag: "UPDATED",
    content: `
# Production Ready REST APIs in a Monolithic Architecture

Building scalable and maintainable REST APIs in a monolithic architecture requires careful planning and adherence to best practices.

## Core Principles

### 1. RESTful Design
- Use proper HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Implement meaningful resource URLs
- Return appropriate status codes
- Follow REST naming conventions

### 2. Architecture Layers

\`\`\`
┌─────────────────────┐
│   Routes Layer      │  → Define API endpoints
├─────────────────────┤
│  Controllers Layer  │  → Handle requests/responses
├─────────────────────┤
│   Services Layer    │  → Business logic
├─────────────────────┤
│   Models Layer      │  → Data models
├─────────────────────┤
│   Database Layer    │  → Data persistence
└─────────────────────┘
\`\`\`

## Essential Components

### Authentication & Authorization
- Implement JWT-based authentication
- Use middleware for route protection
- Apply role-based access control (RBAC)

### Error Handling
- Centralized error handling middleware
- Consistent error response format
- Appropriate HTTP status codes
- Detailed logging for debugging

### Input Validation
- Validate all incoming data
- Use schema validation libraries (Joi, Zod)
- Sanitize inputs to prevent injection attacks

### Rate Limiting
- Protect against abuse
- Use libraries like express-rate-limit
- Implement different limits for different endpoints

## Code Structure Example

\`\`\`javascript
// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const userSchema = require('../schemas/userSchema');

router.get('/', auth, userController.getAllUsers);
router.post('/', validate(userSchema), userController.createUser);
router.get('/:id', auth, userController.getUserById);
router.put('/:id', auth, validate(userSchema), userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
\`\`\`

## Best Practices

1. **Use Environment Variables** for configuration
2. **Implement proper logging** (Winston, Morgan)
3. **Add API documentation** (Swagger/OpenAPI)
4. **Use compression** for responses
5. **Implement CORS** properly
6. **Add health check endpoints**
7. **Use connection pooling** for databases
8. **Implement caching** where appropriate

## Performance Optimization

- Use indexing in databases
- Implement pagination for large datasets
- Cache frequently accessed data
- Use async/await properly
- Optimize database queries

## Security Checklist

- ✓ Input validation and sanitization
- ✓ SQL injection prevention
- ✓ XSS protection
- ✓ CSRF protection
- ✓ Security headers (Helmet.js)
- ✓ Rate limiting
- ✓ Secure password hashing (bcrypt)
- ✓ HTTPS in production
- ✓ Sensitive data encryption

## Monitoring and Logging

Implement comprehensive logging:
- Request/response logs
- Error logs
- Performance metrics
- Security events

Use tools like:
- PM2 for process management
- New Relic or DataDog for monitoring
- ELK stack for log aggregation

## Conclusion

Building production-ready REST APIs requires attention to security, performance, and maintainability. Follow these principles and continuously iterate based on real-world usage and feedback.
    `.trim(),
  },
  {
    title: "Understanding State Management in React",
    slug: "state-management",
    date: "2025-08-22",
    readTime: "5 min",
    description:
      "A blog on state management concepts in React and when to use different solutions.",
    tag: null,
    content: `
# Understanding State Management in React

State management is one of the most critical aspects of building React applications. Choosing the right solution can significantly impact your app's performance and maintainability.

## Types of State

### 1. Local State
Managed within a component using \`useState\` or \`useReducer\`.

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

**When to use:**
- Form inputs
- Toggle states
- Component-specific data

### 2. Global State
Shared across multiple components throughout the app.

**When to use:**
- User authentication data
- Theme preferences
- Shopping cart data
- App-wide settings

### 3. Server State
Data fetched from an API that needs caching and synchronization.

**When to use:**
- API responses
- Database records
- Real-time data

## State Management Solutions

### Context API
Built into React, great for small to medium apps.

\`\`\`jsx
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <YourApp />
    </ThemeContext.Provider>
  );
}
\`\`\`

**Pros:**
- No additional dependencies
- Simple to set up
- Good for theming and auth

**Cons:**
- Can cause unnecessary re-renders
- Not optimized for frequent updates
- Limited dev tools

### Redux
The most popular state management library.

**Pros:**
- Predictable state updates
- Excellent dev tools
- Large ecosystem
- Time-travel debugging

**Cons:**
- Boilerplate code
- Steep learning curve
- Can be overkill for small apps

### Zustand
Lightweight and simple state management.

\`\`\`jsx
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
\`\`\`

**Pros:**
- Minimal boilerplate
- Simple API
- Good performance
- Small bundle size

**Cons:**
- Smaller community
- Fewer resources

### React Query / TanStack Query
Specialized for server state management.

\`\`\`jsx
const { data, isLoading } = useQuery('users', fetchUsers);
\`\`\`

**Pros:**
- Automatic caching
- Background refetching
- Optimistic updates
- Pagination support

**Cons:**
- Learning curve
- Mainly for server state

## Decision Tree

\`\`\`
Do you need to share state?
├─ No → Use local state (useState/useReducer)
└─ Yes → Is it server data?
    ├─ Yes → Use React Query
    └─ No → How complex is your app?
        ├─ Small → Context API or Zustand
        └─ Large → Redux or Zustand
\`\`\`

## Best Practices

1. **Start simple** - Use local state first
2. **Lift state up** only when needed
3. **Separate concerns** - Different stores for different domains
4. **Keep state normalized** - Avoid nested structures
5. **Use selectors** - Optimize re-renders
6. **Don't store derived state** - Compute on render

## Common Pitfalls

### 1. Over-using Global State
Not everything needs to be global. Keep state as local as possible.

### 2. Prop Drilling
Context API can help, but sometimes composition is better.

### 3. Storing Everything in State
Some data can be derived or doesn't need to cause re-renders.

### 4. Not Optimizing Renders
Use \`memo\`, \`useMemo\`, and \`useCallback\` wisely.

## Conclusion

There's no one-size-fits-all solution. Evaluate your app's needs:
- For small apps: useState + Context API
- For medium apps: Zustand + React Query
- For large apps: Redux + React Query

Choose based on your team's expertise and project requirements, not trends.
    `.trim(),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
