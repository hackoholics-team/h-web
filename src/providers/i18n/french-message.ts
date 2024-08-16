import frenchMessages from 'ra-language-french';

//TODO: avoid type any
export const haFrenchMessages: any = {
  ...frenchMessages,
  ha: {
    words: {
      or: 'Ou',
      signin: 'Se connecter',
      signup: "S'inscrire",
      next: 'Suivant',
      prev: 'Précédent',
      finish: 'Terminer',
    },
    text: {
      forgotPassword: 'Mot de passe oublié ?',
      alreadyHaveAccount: 'Vous avez déjà un compte ?',
      doesNotHaveAccountYet: "Vous n'avez pas encore de compte ?",
    },
    login: {
      forms: {
        confirmPassword: {
          label: 'Confirmer votre mot de passe',
          error: 'Les mots de passe ne correspondent pas',
        },
        password: 'Password'
      },
      illustration: {
        header: 'Bienvenue à nouveau à votre travail',
        description:
          'Votre nouveau compagnon eco-responsable pour vos destinations',
        find_our: 'Trouver ici notre ',
        general_rules: 'Règles générale',
      },
      signin: {
        title: 'Se connecter',
        description:
          'Entrez vos informations de connexion pour accéder à votre compte.',
        wrong_credentials: 'Mauvais mot de passe ou email',
      },
      signup: {
        title: 'Créer un compte',
        description:
          'Remplissez les informations ci-dessous pour créer un nouveau compte.',
      },
      completeInfo: {
        title: 'Complétez vos informations',
        description:
          'Veuillez fournir les informations manquantes pour finaliser votre inscription.',
        step0: 'Création de compte',
        step1: 'Nom & Prénoms',
        step2: "Nom d'utilisateur & Date D'anniversaire",
        birthdate: 'Date de Naissance',
        lastName: 'Prénom',
        firstName: 'Nom',
        username: 'Nom d\'Utilisateur'
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
