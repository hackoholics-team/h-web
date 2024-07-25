import englishMessages from 'ra-language-english';

//TODO: avoid type any
export const haEnglishMessages: any = {
  ...englishMessages,
  ha: {
    words: {
      or: 'Or',
      signin: 'Signin',
      signup: 'Signup',
    },
    text: {
      forgotPassword: 'Forgot password ?',
      alreadyHaveAccount: 'Already have a account ?',
      doesNotHaveAccountYet: 'Does not have an account yet ?',
    },
    login: {
      forms: {
        confirmPassword: {
          label: 'Confirm your password',
          error: 'The passwords do not match',
        },
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
