const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./{pages,components}/**/*.tsx"],
  theme: {
    colors: {
		purple: {
			300: "#9277FF",
			600: "#7C5DFA",
		},
		grey: {
			300: "#DFE3FA",
			600: "#888EB0",
			900: "#7E88C3",
			1200: "#252945",
			1500: "#1E2139",
		},
		black: {
			300: "#141625",
			600: "#0C0E16",
			full: "#000",
		},
		red: {
			300: "#FF9797",
			600: "#EC5757",
		},
		white: {
			300: "#F8F8FB",
			full: "#fff",
		}
	},
	fontFamily: {
		spartan: ["Spartan", "sans-serif"],
	},
	fontSize: {
		xs: ".6875rem",
		sm: ".75rem",
		base: "1rem",
		md: "1.25rem",
		lg: "2rem",
	},
  },
  plugins: [
	  require("tailwind-scrollbar"),
	  plugin(
		  ({ addUtilities, theme }) => {
			  addUtilities({
				  ".text-h1": {
					  fontWeight: theme("fontWeight.bold"),
					  fontSize: theme("fontSize.lg"),
					  lineHeight: "2.25rem",
					  letterSpacing: "-1px",
				  },
				  ".text-h2": {
					  fontWeight: theme("fontWeight.bold"),
					  fontSize: theme("fontSize.md"),
					  lineHeight: "1.375rem",
					  letterSpacing: "-0.63px",
				  },
				  ".text-h3": {
					  fontWeight: theme("fontWeight.bold"),
					  fontSize: theme("fontSize.base"),
					  lineHeight: "2rem",
					  letterSpacing: "-0.8px",
				  },
				  ".text-h4": {
					  fontWeight: theme("fontWeight.bold"),
					  fontSize: theme("fontSize.sm"),
					  lineHeight: ".9375rem",
					  letterSpacing: "-0.25px",
				  },
				  ".text-body-1": {
					  fontWeight: theme("fontWeight.medium"),
					  fontSize: theme("fontSize.sm"),
					  lineHeight: ".9375rem",
					  letterSpacing: "-0.25px",
				  },
				  ".text-body-2": {
					  fontWeight: theme("fontWeight.medium"),
					  fontSize: theme("fontSize.xs"),
					  lineHeight: "1.125rem",
					  letterSpacing: "-0.23px"
				  },
			  })
		  }
	  )
  ],
}
