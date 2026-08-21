import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

// https://twitter.com/src_rip/status/1745407959562154230
// https://twitter.com/souporserious/status/1746311121949356469

export default defineConfig({
  shortcuts: [
    ['base-bg', 'bg-slate-100 dark:bg-slate-900'],
    ['depth-bg', 'bg-slate-200 dark:bg-slate-950'],
    ['surface-bg', 'bg-slate-50/70 dark:bg-slate-800/40'],
    ['surface-strong-bg', 'bg-slate-50/90 dark:bg-slate-800/75'],
    ['text-base', 'text-slate-950 dark:text-slate-50'],
    ['text-body', 'text-slate-700 dark:text-slate-300'],
    ['text-muted', 'text-slate-500 dark:text-slate-400'],
    ['text-subtle', 'text-slate-400 dark:text-slate-500'],
    ['text-depth', 'text-slate-200 dark:text-slate-950'],
    ['text-primary', 'text-rose-700 dark:text-rose-300'],
    ['text-secondary', 'text-purple-700 dark:text-purple-300'],
    ['border-base', 'border-slate-300/70 dark:border-slate-700/70'],
    ['border-subtle', 'border-slate-300/45 dark:border-slate-700/45'],
    ['border-primary', 'border-rose-500/60 dark:border-rose-400/50'],
    ['surface-frosted', 'border border-slate-300/70 bg-slate-50/70 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-800/40'],
    ['surface-recessed', 'border border-slate-300/60 bg-slate-200/80 dark:border-slate-700/60 dark:bg-slate-950/70'],
    ['content-container', 'mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10'],
    ['display-heading', '[word-spacing:0.04em] font-extrabold leading-[0.92] tracking-[-0.035em] font-sans'],
    ['meta-label', 'text-[0.65rem] text-slate-500 tracking-[0.16em] font-mono uppercase dark:text-slate-400'],
    ['meta-label-primary', 'text-[0.65rem] text-rose-700 tracking-[0.16em] font-mono uppercase dark:text-rose-300'],
    ['meta-label-secondary', 'text-[0.65rem] text-purple-700 tracking-[0.16em] font-mono uppercase dark:text-purple-300'],
    ['pill-control', 'inline-flex items-center border border-slate-300/70 rounded-full px-4 py-2 text-xs font-mono transition dark:border-slate-700/70'],
    ['control-primary', 'inline-flex items-center rounded-full bg-rose-400 px-4 py-2 text-xs text-slate-950 font-mono transition hover:bg-rose-300 active:bg-rose-500 focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset-2'],
    ['icon-control', 'size-9 inline-flex items-center justify-center border border-slate-300/70 rounded-full text-slate-700 transition hover:border-rose-500/60 hover:text-rose-700 dark:border-slate-700/70 dark:text-slate-300 dark:hover:border-rose-400/50 dark:hover:text-rose-300'],
    ['accent-line', 'from-rose-400 via-purple-400 to-rose-400 bg-gradient-to-r bg-[length:200%_100%]'],
    ['ambient-primary', 'bg-rose-400/15 dark:bg-rose-400/10'],
    ['ambient-secondary', 'bg-purple-400/15 dark:bg-purple-400/10'],
    ['btn', 'control-primary cursor-pointer disabled:cursor-default disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none text-muted transition duration-200 ease-in-out hover:text-primary'],
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
    ['grid-cols-subgrid', { 'grid-template-columns': 'subgrid;' }],
    // eslint-disable-next-line unused-imports/no-unused-vars
    [/^bg-checked$/, ([,], { rawSelector, currentSelector, variantHandlers, theme }) => {
      const selector = `.${currentSelector}`
      const mainColor = theme.colors.slate[200]
      const darkColor = theme.colors.slate[700]

      return `
        ${selector} {
            background-color: transparent;
            background-image: 
              radial-gradient(
                rgba(0,0,0,0) 2px,
                ${mainColor} 2px
              );
            background-size: 4px 4px;
            backdrop-filter: brightness(100%) blur(3px);
         }
        .dark ${selector} {
            background-image: 
              radial-gradient(
                rgba(0,0,0,0) 2px,
                ${darkColor} 2px
              );
         }
      `
    }],
    // https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter
    ['scrollbar-gutter', { 'scrollbar-gutter': 'auto' }],
    ['scrollbar-gutter-stable', { 'scrollbar-gutter': 'stable' }],
    ['scrollbar-gutter-stable-both', { 'scrollbar-gutter': 'stable both-edges' }],
    ['scrollbar-gutter-unset', { 'scrollbar-gutter': 'unset' }],
    ['shadow-flat', { 'box-shadow': '0 0 0 rgba(0,0,0,0)' }],
    ['shadow-harsh', { 'box-shadow': '4px 4px 0 rgba(0,0,0,1)' }],
    ['shadow-inner-harsh', { 'box-shadow': 'inset 4px 4px 0 rgba(0,0,0,1)' }],
    ['interpolate-size', { 'interpolate-size': 'allow-keywords' }],
  ],
  presets: [
    presetWind3(),
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
            name: 'Plus Jakarta Sans',
            weights: [300, 400, 500, 600, 700],
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
        serif: 'Bitter',
        mono: [
          {
            name: 'Google Sans Code',
            weights: [300, 400, 500, 600, 700, 800],
            italic: true,
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
