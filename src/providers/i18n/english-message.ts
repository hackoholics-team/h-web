import englishMessages from 'ra-language-english';

//TODO: avoid type any
export const haEnglishMessages: any = {
  ...englishMessages,
  ha: {
    words: {
      or: 'Or',
    },
    login: {
      forms: {
        confirmPassword: {
          label: 'Confirm your password',
          error: 'The passwords do not match',
        },
      },
      buttons: {
        signup: 'Signup',
        signin: 'Signin',
      },
      illustration: {
        header: 'Welcome back to your job',
      },
    },
    locales: {
      fr: {
        name: 'French',
      },
      en: {
        name: 'English',
      },
    },
  },
};
