/** @type {import('tailwindcss').Config} */
const config = {
    content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
    theme: {
      extend: {
        typography: {
          DEFAULT: {
            css: {
              maxWidth: '100%',
              p: {
                marginTop: '1em',
                marginBottom: '1em',
              },
            },
          },
        },
      },
    },
    plugins: [
     '@tailwindcss/typography',
    ],
  }

  export default config
  