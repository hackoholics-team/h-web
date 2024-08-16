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
        password: 'Mot de passe',
      },
      illustration: {
        header: 'Welcome back',
        description: 'This will be a yuur new eco-friendly comp',
        find_our: 'Find here our ',
        general_rules: 'General rules',
      },
      signin: {
        title: 'Sign In',
        description: 'Enter your login details to access your account.',
        wrong_credentials: 'Wrong Password or Email',
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
        birthdate: 'Birthdate',
        lastName: 'Last Name',
        firstName: 'First Name',
        username: 'Username',
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
