# 🚀 Nuxt Performance Optimization Implementation Plan

Based on the optimization checklist in `optimization.md` and Anthony Fu's best practices, here are the optimized implementation tasks with tool integration:

## Phase 1 (Foundation) - Priority: High

### Code Quality Setup (antfu preferences)

- [x] **Set up @antfu/eslint-config**
  - Install `@antfu/eslint-config` for unified linting + formatting (no Prettier)
  - Configure `eslint.config.js` with `// @ts-check` and `import antfu from '@antfu/eslint-config'`
  - Ensure strict TypeScript mode enabled
- [x] **Configure Vitest testing framework**
  - Install `@nuxt/test-utils/vitest` for Nuxt-specific testing
  - Set up test files alongside source files: `foo.ts` → `foo.test.ts`
  - Configure `describe`/`it` API for unit tests
- [x] **Add pre-commit quality gates**
  - Set up `simple-git-hooks` + `lint-staged` for automated pre-commit checks
  - Add `prepare` script: `"prepare": "npx simple-git-hooks"`
  - Configure hook: `"pre-commit": "pnpm i --frozen-lockfile --ignore-scripts --offline && npx lint-staged"`

### Build Tool Optimization

- [x] **Configure Vite for performance**
  - Enable `reportCompressedSize: false` (antfu preference)
  - Set up `rollupOptions` with manual chunking strategy
  - Configure source maps for development only
- [x] **Add performance budget enforcement**
  - Set bundle size limits in build hooks
  - Configure compression for public assets
  - Enable Nitro minification for SSR

## Phase 2 (Data & Rendering) - Priority: Medium

### Data Fetching & Payload Optimization

- [ ] **Optimize payload sizes with `transform` utilities**
  - Add `pick` properties to reduce transferred data
  - Implement server-side `transform` functions in `server/utils`
  - Remove unnecessary fields from API responses at source
- [ ] **Implement Nuxt route rules for advanced caching**
  - Configure ISR (Incremental Static Regeneration) for `/blog/**` routes
  - Set `ssr: false` for client-only admin routes
  - Add hybrid rendering rules for optimal performance
- [ ] **Server-side caching with Nitro**
  - Use `cachedEventHandler` for expensive computations
  - Implement proper cache keys for data invalidation
  - Configure cache TTL based on data freshness requirements
- [ ] **Parallel fetch implementation (Vue/Nuxt best practice)**
  - Convert to `Promise.all()` for concurrent API calls
  - Use `useAsyncData` with parallel keys for hydration
  - Implement `useLazyAsyncData` for conditional loading

## Phase 3 (Code & Assets) - Priority: Medium

### Runtime Optimizations (Vue best practices)

- [ ] **Composable-based lazy loading patterns**

  - Extract `useLazyLoad` composable using `@vueuse/core` for intersection observer logic
  - Convert heavy components to `<LazyHeavyComponent />` with `defineAsyncComponent`
  - Use `ref()` over `reactive()` for component visibility state (Vue preference)
  - Add `<ClientOnly>` wrappers with `defineModel()` for v-model controls (3.4+)

- [ ] **Vue Composition API optimizations**
  - Leverage `@vueuse/core` composables (useIntersectionObserver, useDebounce)
  - Implement `defineModel()` for reactive form controls
  - Extract loading states into reusable `useLoading` composable
  - Use proper prop types with interfaces (TypeScript best practice)

### Advanced Nuxt Rendering

- [ ] **Hybrid rendering strategy**
  - Use `routeRules` for fine-grained SSR/CSR/ISR decisions
  - Set up CSR-only rendering for `/admin/**` with `ssr: false`
  - Add `prefetch` attributes to `<NuxtLink>` for navigation links
  - Implement `middleware` for route-level lazy loading

### Advanced Code-Level Optimizations

- [ ] **Bundle analysis and optimization**
  - Run `npx nuxt analyze` and address oversized chunks
  - Use `build.analyze` config for detailed bundle insights
- [ ] **Bundle optimization**
  - Eliminate oversized chunks via dynamic imports
  - Optimize vendor chunks with proper code splitting

## Phase 4 (Testing & Monitoring) - Priority: Medium

### Comprehensive Testing Strategy

- [ ] **Visual regression testing**
  - Set up Playwright for E2E performance scenarios
  - Add visual tests to prevent UI regressions
  - Include performance metrics in test reports
- [ ] **Unit testing optimization**
  - Add Vitest tests for critical performance logic
  - Test composable performance patterns
  - Benchmark component loading times
- [ ] **Performance testing**
  - Configure Lighthouse CI for automated regression testing
  - Set bundle size assertions in test suite
  - Add Web Vitals monitoring to test pipeline

### Advanced Nuxt Features

- [ ] **Nuxt Image integration with optimization**
  - Install `@nuxt/image` module for automatic image optimization
  - Convert `<img>` tags to `<NuxtImg>` with responsive formats
  - Configure WebP/PNG optimization and lazy loading
- [ ] **Enhanced monitoring (antfu preferences)**

  - Add Web Vitals tracking with `vite-plugin-vitals`
  - Implement error boundary components with composition API
  - Set up Core Web Vitals realtime monitoring

- [ ] **Edge deployment with Nitro optimization**
  - Configure for Vercel Edge Functions or Cloudflare Workers
  - Set up edge-side cached data patterns using Nitro cache
  - Optimize for global CDN delivery with proper asset chunking

## Next Priority Actions (Reordered for Best Practices)

1. **High Priority**: Foundation setup - Code quality tools (@antfu/eslint-config, Vitest, TypeScript strict, build configuration)
2. **High Priority**: Data optimization - Payload reduction, ISR configuration, server-side caching with proper route rules
3. **Medium Priority**: Component optimization - Composition API patterns, composable extraction, lazy loading with Vue best practices
4. **Medium Priority**: Testing & monitoring - Comprehensive testing strategy, performance budgets, monitoring integration

## Success Metrics (Comprehensive Performance Targets)

- **Lighthouse Performance Score**: Target 95+ (pagespeed.web.dev or CI)
- **Core Web Vitals**: ALL metrics passing (<2.5s LCP, <100ms FID, <0.1 CLS)
- **Bundle Size**: <500KB gzip compressed total, <250KB First Load JS
- **API Response Times**: <1.0s average, <500ms CDN responses
- **TypeScript Coverage**: 100% strict mode compliance, no `any` types
- **Test Coverage**: >80% with Vitest, passing E2E performance regressions
- **Build Time**: <10s dev builds, <2min production builds
- **Runtime Memory**: <50MB heap usage in production scenarios

## Verification Steps (Enhanced with Best Practices)

- **Code Quality Checks**: `pnpm run lint`, `pnpm run typecheck` after each phase (antfu preference)
- **Testing Coverage**: `pnpm run test` with Vitest, maintain coverage >80%
- **Bundle Analysis**: `pnpm run build:analyze` for pack and bundle analyzer
- **Performance Budgets**: Fail builds over bundle size limits (>500KB compressed)
- **Lighthouse CI**: Automated `lighthouse http://localhost:3000 --output json --output html`
- **Web Vitals Monitoring**: Track in production with Core Web Vitals dashboard
- **Build Size Assertions**: `toMatchFileSnapshot` tests for bundle sizes in CI

\*Priority reordering follows Anthony Fu's systematic approach: foundation tools first, domain optimizations second, ensuring sustainable and testable performance improvements\*\*
