module.exports = {
    purge: {
        enabled: true,
        content: [
            './src/*.html',
            './src/assets/js/*.js',
        ],

    },
    darkMode: false, // or 'media' or 'class'
    theme: {

        fontFamily: {

            'roboto': ['Roboto', 'sans-serif'],
            'roboto-condensed': ['"Roboto Condensed"', 'sans-serif']

        },

        extend: {

            zIndex: {
                '999': '999',
                '-1': '-1'
            },

            animation: {
                showHeader: 'showHeader 500ms ease-in-out',
                showMain: 'showMain 500ms ease-in-out',
                showInput: 'showInput 500ms ease-in-out',
                // showFooter: ,
                showToDo: 'showToDo 200ms ease-in-out',
            },

            keyframes: {

                showToDo: {
                    '0%': {
                        opacity: '0'
                    },
                    '100%': {
                        opacity: '1'
                    }
                },

                showHeader: {
                    '0%': {
                        transform: 'translateY(100%)',
                        opacity: 0,
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: 1
                    }
                },

                showMain: {
                    '0%': {
                        transform: 'scale(1.5)',
                        opacity: 0
                    },
                    '100%': {
                        transform: 'scale(1.0)',
                        opacity: 1
                    }
                },

                showInput: {
                    '0%': {
                        transform: 'translateY(-100%)',
                        opacity: 0,
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: 1
                    }
                },

            }

        },

    },
    variants: {
        extend: {
            borderWidth: ['last'],
            borderStyle: ['last'],
            borderColor: ['active'],
            textColor: ['group-focus']

        },
    },
    plugins: [

        require('tailwind-scrollbar'),

    ],
}
