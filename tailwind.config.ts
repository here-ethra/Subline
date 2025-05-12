
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				subline: {
					indigo: '#4F46E5',
					indigoLight: '#6366F1',
					coral: '#FF6B6B',
					coralLight: '#FF9E9E',
					darkBg: '#0A0A0A',
					darkCard: '#141414',
					neutral: '#8E9196',
					light: '#F1F0FB',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'slide-in-from-bottom': {
					from: { transform: 'translateY(10%)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
                'slide-in-from-top': {
                  from: { transform: 'translateY(-10%)', opacity: '0' },
                  to: { transform: 'translateY(0)', opacity: '1' }
                },
                'shine': {
                  '0%': { backgroundPosition: '200% 0' },
                  '100%': { backgroundPosition: '-200% 0' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
				'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
                'shine': 'shine 8s ease-in-out infinite',
                'pulse-slow': 'pulse 6s infinite'
			},
            backgroundImage: {
              'gradient-indigo-coral': 'linear-gradient(135deg, #4F46E5 0%, #FF6B6B 100%)',
              'gradient-dark': 'linear-gradient(180deg, #141414 0%, #0A0A0A 100%)',
              'gradient-card': 'linear-gradient(120deg, rgba(79, 70, 229, 0.08) 0%, rgba(255, 107, 107, 0.08) 100%)',
              'shine-effect': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'
            },
            fontFamily: {
              'inter': ['Inter', 'sans-serif'],
              'satoshi': ['Satoshi', 'sans-serif'],
            },
            boxShadow: {
              'subline': '0 8px 16px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)',
              'subline-hover': '0 12px 24px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.2)',
              'subline-inset': 'inset 0 2px 4px rgba(0, 0, 0, 0.15)'
            },
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
