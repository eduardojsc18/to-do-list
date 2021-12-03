module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {

        fontFamily: {

            'roboto': ['Roboto', 'sans-serif'],
            'roboto-condensed': ['"Roboto Condensed"', 'sans-serif']

        },

        extend: {

            zIndex: {
                '-1': '-1'
            }

        },

    },
    variants: {
        extend: {

            borderColor: ['active'],
            textColor: ['group-focus']

        },
    },
    plugins: [],
}
