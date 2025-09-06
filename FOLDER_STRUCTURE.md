# Jatayat Web - Folder Structure

This document outlines the organized folder structure for the Jatayat web application.

## 📁 **Project Structure**

```
src/
├── components/           # Reusable UI components
│   └── ui/              # Basic UI components
│       ├── Button/      # Button component
│       │   ├── types.d.ts
│       │   ├── helper.ts
│       │   ├── hooks.ts
│       │   └── index.tsx
│       ├── Card/        # Card component
│       │   ├── types.d.ts
│       │   ├── helper.ts
│       │   ├── hooks.ts
│       │   └── index.tsx
│       └── index.ts     # Export all UI components
├── pages/               # Application pages
│   ├── Login/           # Login page
│   │   ├── types.d.ts
│   │   ├── helper.ts
│   │   ├── hooks.ts
│   │   └── index.tsx
│   ├── Dashboard/       # Dashboard page
│   │   ├── types.d.ts
│   │   ├── helper.ts
│   │   ├── hooks.ts
│   │   └── index.tsx
│   └── index.ts         # Export all pages
├── contexts/            # React contexts
│   └── AuthContext/
│       └── index.tsx
├── utils/               # Utility functions
│   └── firebase/
│       └── firebase.ts
└── App.tsx              # Main application component
```

## 🏗️ **Component/Page Structure**

Each component and page follows a consistent structure:

### **Required Files**

1. **`types.d.ts`** - TypeScript type definitions
   - Interface definitions
   - Type exports
   - Props interfaces

2. **`helper.ts`** - Pure helper functions
   - Utility functions
   - Data transformation
   - Formatting functions
   - Business logic helpers

3. **`hooks.ts`** - Custom React hooks
   - Component-specific hooks
   - State management
   - Side effects
   - Event handlers

4. **`index.tsx`** - Main component/page
   - React component implementation
   - JSX structure
   - Component logic

### **Optional Files**

5. **`constants.ts`** - Constants and configuration
6. **`styles.ts`** - Styled components (if using styled-components)
7. **`utils.ts`** - Component-specific utilities

## 📋 **File Responsibilities**

### **types.d.ts**
```typescript
// Define all TypeScript interfaces and types
export interface ComponentProps {
  // Props interface
}

export interface ComponentState {
  // State interface
}

export type ComponentVariant = 'primary' | 'secondary';
```

### **helper.ts**
```typescript
// Pure functions without side effects
export const formatData = (data: any) => {
  // Data transformation logic
};

export const validateInput = (input: string) => {
  // Validation logic
};
```

### **hooks.ts**
```typescript
// Custom React hooks
export const useComponentLogic = () => {
  // Hook implementation
  return { state, handlers };
};
```

### **index.tsx**
```typescript
// Main component implementation
const Component: React.FC<ComponentProps> = (props) => {
  // Component logic using hooks and helpers
  return <div>Component JSX</div>;
};
```

## 🎯 **Benefits of This Structure**

1. **Separation of Concerns**
   - Types are clearly defined
   - Business logic is separated from UI
   - Hooks encapsulate component logic

2. **Maintainability**
   - Easy to find specific functionality
   - Clear file responsibilities
   - Consistent structure across components

3. **Reusability**
   - Helper functions can be easily tested
   - Hooks can be reused across components
   - Types provide clear contracts

4. **Scalability**
   - Easy to add new features
   - Clear patterns for new developers
   - Consistent code organization

## 🚀 **Usage Examples**

### **Importing Components**
```typescript
// Import specific component
import Button from './components/ui/Button';

// Import multiple components
import { Button, Card } from './components/ui';
```

### **Importing Pages**
```typescript
// Import specific page
import Login from './pages/Login';

// Import multiple pages
import { Login, Dashboard } from './pages';
```

### **Using Types**
```typescript
import { ButtonProps } from './components/ui/Button/types';
import { LoginPageProps } from './pages/Login/types';
```

## 📝 **Best Practices**

1. **Keep files focused** - Each file should have a single responsibility
2. **Use TypeScript** - Define clear interfaces and types
3. **Write pure functions** - Helper functions should be side-effect free
4. **Custom hooks** - Encapsulate component logic in hooks
5. **Consistent naming** - Use clear, descriptive names
6. **Export patterns** - Use index files for clean imports

## 🔄 **Adding New Components/Pages**

1. Create folder with component/page name
2. Add required files: `types.d.ts`, `helper.ts`, `hooks.ts`, `index.tsx`
3. Implement functionality following the established patterns
4. Update relevant `index.ts` files for exports
5. Add to documentation if needed

This structure ensures consistency, maintainability, and scalability across the entire application.
