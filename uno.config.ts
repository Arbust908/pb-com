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
    [/^meta-label-(\w+)$/, ([, colorType], { currentSelector, theme }) => {
      const selector = `.${currentSelector}`
      let color = 'slate'
      switch (colorType) {
        case 'primary':
          color = 'rose'
          break
        case 'secondary':
          color = 'purple'
          break
      }
      const textColor = theme.colors[color][700]
      const darkTextColor = theme.colors[color][300]

      return `
        ${selector} {
          color: ${textColor};
          text-transform: uppercase;
          font-family: ${theme.fontFamily.mono};
          font-size: 0.65rem;
          letter-spacing: 0.16em;
        }

        .dark ${selector} {
          color: ${darkTextColor};
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
