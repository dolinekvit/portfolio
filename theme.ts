import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const theme = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { _light: "#eed9c4", _dark: "#202023" }
          },
          subtle: {
            value: { _light: "#b8a99a" }
          }
        },
      }
    }
  }
})

export const system = createSystem(defaultConfig, theme)

