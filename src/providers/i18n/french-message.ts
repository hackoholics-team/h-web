import frenchMessages from 'ra-language-french';

//TODO: avoid type any
export const haFrenchMessages: any = {
  ...frenchMessages,
  ha: {
    words: {
      or: 'Ou',
    },
    login: {
      forms: {
        confirmPassword: {
          label: 'Confirmer votre mot de passe',
          error: 'Les mots de passe ne correspondent pas',
        },
      },
      buttons: {
        signup: 'Créer',
        signin: 'Connecter',
      },
      illustration: {
        header: 'Bienvenue à nouveau à votre travail',
      },
    },
    locales: {
      fr: {
        name: 'Français',
      },
      en: {
        name: 'Anglais',
      },
    },
  },
};
