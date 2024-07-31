import englishMessages from 'ra-language-english';

//TODO: avoid type any
export const haEnglishMessages: any = {
  ...englishMessages,
  ha: {
    words: {
      or: 'Or',
      signin: 'Signin',
      signup: 'Signup',
      next: 'Next',
      prev: 'Back',
      finish: 'Finish',
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
      signin: {
        title: 'Sign In',
        description: 'Enter your login details to access your account.',
      },
      signup: {
        title: 'Sign Up',
        description: 'Fill out the information below to create a new account.',
      },
      completeInfo: {
        title: 'Complete Your Information',
        description: 'Please provide the missing',
        step0: 'Account creation',
        step1: 'Name & Firstname',
        step2: 'Username & Birthdate',
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
