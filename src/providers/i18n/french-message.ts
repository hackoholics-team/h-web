import frenchMessages from 'ra-language-french';

//TODO: avoid type any
export const haFrenchMessages: any = {
  ...frenchMessages,
  ha: {
    login: {
      forms: {
        confirmPassword: {
          label: 'Confirmer votre mot de passe',
          error: 'Les mots de passe ne correspondent pas',
        },
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
