import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['base-bg', 'bg-slate-100 dark:bg-slate-900'],
    ['surface-bg', 'bg-slate-50/70 dark:bg-slate-800/40'],
    ['surface-strong-bg', 'bg-slate-50/90 dark:bg-slate-800/75'],
    ['color-base', 'text-slate-950 dark:text-slate-50'],
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
    ['content-container', 'mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10'],
    ['display-heading', 'font-extrabold leading-[0.9] tracking-[-0.035em] font-mono'],
    ['meta-label', 'text-[0.65rem] text-slate-500 tracking-[0.16em] font-mono uppercase dark:text-slate-400'],
    ['meta-label-primary', 'text-[0.65rem] text-rose-700 tracking-[0.16em] font-mono uppercase dark:text-rose-300'],
    ['meta-label-secondary', 'text-[0.65rem] text-purple-700 tracking-[0.16em] font-mono uppercase dark:text-purple-300'],
    ['pill-control', 'inline-flex items-center border border-slate-300/70 rounded-full px-4 py-2 text-xs font-mono transition dark:border-slate-700/70'],
    ['control-primary', 'inline-flex items-center rounded-full bg-rose-400 px-4 py-2 text-xs text-slate-950 font-mono transition hover:bg-rose-300 active:bg-rose-500 focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset-2'],
    ['icon-control', 'size-9 inline-flex items-center justify-center border border-slate-300/70 rounded-full text-slate-700 transition hover:border-rose-500/60 hover:text-rose-700 dark:border-slate-700/70 dark:text-slate-300 dark:hover:border-rose-400/50 dark:hover:text-rose-300'],
    ['accent-line', 'from-rose-400 via-purple-400 to-rose-400 bg-gradient-to-r bg-[length:200%_100%]'],
    ['ambient-primary', 'bg-rose-400/15 dark:bg-rose-400/10'],
    ['ambient-secondary', 'bg-purple-400/15 dark:bg-purple-400/10'],
    ['z-under', 'z-0'],
    ['z-above', 'z-1'],
    ['z-content', 'z-10'],
    ['z-raised', 'z-10'],
    ['z-main', 'z-20'],
    ['z-sticky', 'z-30'],
    ['z-nav', 'z-40'],
    ['z-progress', 'z-60'],
    ['z-skip-link', 'z-60'],
    ['z-dialog', 'z-100'],
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
    [/^bg-checked$/, ([,], { currentSelector, theme }) => {
      const selector = `.${currentSelector}`
      const mainColor = theme.colors.slate[200]
      const darkColor = theme.colors.slate[700]
      const backdropBrightness = 100
      const backdropBlur = 8
      const sqSize = 2
      const bgSize = `${sqSize * 2}px ${sqSize * 2}px`

      return `
        ${selector} {
            background-color: transparent;
            background-image: 
              radial-gradient(
                rgba(0,0,0,0) ${sqSize}px,
                ${mainColor} ${sqSize}px
              );
            background-size: ${bgSize};
            backdrop-filter: brightness(${backdropBrightness}%) blur(${backdropBlur}px);
         }
        .dark ${selector} {
            background-image: 
              radial-gradient(
                rgba(0,0,0,0) ${sqSize}px,
                ${darkColor} ${sqSize}px
              );
         }
      `
    }],
  ],
  presets: [
    presetWind3(),
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
