import { watch } from 'vue'

export function useWatchCharacters(valueToWatch, maxChars = 150) {
  watch(valueToWatch, (newValue) => {
    if (newValue.length === maxChars) {
      alert(`You can only enter up to ${ maxChars } characters`)
    }
  })
}