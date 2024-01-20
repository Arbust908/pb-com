import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

// https://twitter.com/src_rip/status/1745407959562154230
// https://twitter.com/souporserious/status/1746311121949356469

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    [/^size-(.+)$/, ([, size]: [any, any]) => `w-${size} h-${size}`],
    ['flex-middle', 'flex items-center justify-center'],
  ],
  rules: [
    [
      /^layout-grid$/,
      (_: any, { currentSelector }: { currentSelector: string }) => {
        const selector = `.${currentSelector}`

        return `
          ${selector} {
          --gap: 16px;
          --full: minmax(var(--gap), 1fr);
          --content: min(50ch, 100% - var(--gap) * 2);
          --popout: minmax(0, 32px);
          --feature: minmax(0, 192px);
  
          display: grid;
          grid-template-columns:
            [full-start] var(--full)
            [feature-start] var(--feature)
            [popout-start] var(--popout)
            [content-start] var(--content) [content-end]
            var(--popout) [popout-end]
            var(--feature) [feature-end]
            var(--full) [full-end];
          }
  
          ${selector} > * {
            grid-column: content;
          }`
      },
    ],
    [
      /^layout-grid-(\w+)$/,
      ([full, name]: any) => {
        // Second param is ctx = { rawSelector, currentSelector, variantHandlers, theme }: any
        // we could use either full, rawSelector or currentSelector
        const selector = `.layout-grid .${full}`

        return `
          ${selector} {
            grid-column: ${name};
          }`
      },
    ],
    [
      /^no-scrollbar$/,
      (_: any, { currentSelector }: { currentSelector: string }) => {
        const selector = `.${currentSelector}`
        return `
        ${selector} {
          -ms-overflow-style: none;
          scrollbar-width: none;
          &::-webkit-scrollbar {
            display: none;
          }
        }`
      },
    ],
    // https://twitter.com/ChromiumDev/status/1734742817812152796
    ['break-normal', { 'word-break': 'normal' }],
    ['break-phrase', { 'word-break': 'auto-phrase' }],
    ['text-balance', { 'text-wrap': 'balance;' }],
    ['text-pretty', { 'text-wrap': 'pretty;' }],
    ['text-stable', { 'text-wrap': 'stable;' }],
    ['grid-cols-subgrid',	{ 'grid-template-columns': 'subgrid;' }],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: [
          {
            name: 'Space Grotesk',
            weights: [300, 400, 500, 600, 700],
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
        serif: 'DM Serif Display',
        mono: [
          {
            name: 'Space Mono',
          },
          {
            name: 'monospace',
            provider: 'none',
          },
        ],
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
