import { extendTheme } from '@chakra-ui/react'

const colors = {
  primary: {
    50: '#ff9e9b',
    100: '#ff7571',
    200: '#ff4c48',
    300: '#ff231f',
    400: '#aa1916',
    500: '#b43432',
    600: '#7a0604'
  }
}

const fonts = {
  heading: 'Inter Variable, -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
  body: 'Inter Variable, -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
  mono: "'Roboto Mono Variable', monospace"
}

const overrides = {
  global: () => ({
    html: {
      scrollBehavior: 'smooth'
    },
    body: {
      backgroundColor: 'rgb(236 236 236)',
      minHeight: '100vh'
    }
  })
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors,
  styles: overrides,
  fonts
}

const theme = extendTheme(config)

export default theme
