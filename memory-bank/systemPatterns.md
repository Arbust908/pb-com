# System Patterns

## System Architecture

- The application is built using Nuxt 3, a framework for creating Vue.js applications.
- It follows a component-based architecture, where UI elements are organized into reusable components.
- UnoCSS is used for styling, providing a utility-first approach to CSS.
- The application includes a chat component for user interaction.
- Supabase is used as the backend service, with composables providing typed API access.

## Key Technical Decisions

- The choice of Nuxt 3 provides a robust and well-structured framework for development.
- UnoCSS was chosen for its flexibility and ease of use in creating custom styles.
- The inclusion of a chat component enhances user engagement.

## Design Patterns

- Component-based architecture: The UI is built using reusable Vue components.
- Utility-first CSS: UnoCSS provides a set of utility classes for styling.
- Data Access: Two-layer pattern with Pinia stores managing state/caching and composables providing a clean API.
- Error Handling: Consistent error handling patterns in data access layers.
- State Management: Composition API-style Pinia stores using setup syntax for better TypeScript integration and reactivity.

## Component Relationships

- Components are organized in a hierarchical structure, with parent components passing data to child components.
- The chat component likely interacts with a backend service or API for real-time communication.
- Data access follows a layered pattern:
  1. Components use composables (e.g., useSkills)
  2. Composables interact with Pinia stores
  3. Stores manage caching and Supabase communication

<!-- "The best way to predict the future is to invent it." - Alan Kay -->
