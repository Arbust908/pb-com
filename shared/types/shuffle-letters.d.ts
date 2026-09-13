declare module 'shuffle-letters' {
  interface ShuffleLettersOptions {
    iterations?: number
    fps?: number
    text?: string
  }

  export default function shuffleLetters(
    element?: HTMLElement,
    options?: ShuffleLettersOptions,
  ): void
}
