const ICON_PREFIX = '../../assets/icons/'

const iconUrls = import.meta.glob<string>('../../assets/icons/*.svg', {
  eager: true,
  query: '?url&no-inline',
  import: 'default',
})

export function resolveSkillIcon(name: string): string | undefined {
  const iconName = name.replace(/\.svg$/, '')
  return iconUrls[`${ICON_PREFIX}${iconName}.svg`]
}
