AFRIKORA — VERSION PANAFRICAINE (PAQUET REVU)

Contenu :
- index.html : site AFRIKORA avec sélection de pays, affichage de monnaie locale,
  filtre par pays et enregistrement du code pays sur les annonces.
- admin.html : page d'administration existante.
- afrikora-logo.png, afrikora-192.png, afrikora-512.png : identité visuelle existante.
- AFRIKORA-migration-panafricaine.sql : migration minimale à examiner avant exécution.

AVANT TOUT DÉPLOIEMENT
1. Conserver une sauvegarde du projet Vercel actuellement en ligne.
2. Sauvegarder la base Supabase.
3. Vérifier dans Supabase que les tables public.annonces et public.profiles existent
   et que les colonnes utilisées par le site correspondent au schéma réel.
4. Examiner puis exécuter la migration SQL uniquement si elle correspond au schéma
   de votre projet. Elle ajoute country_code à annonces et profiles et crée un index.
   Les anciennes annonces reçoivent le code BF par défaut.
5. Ne pas désactiver RLS. Vérifier séparément les politiques des tables et du bucket
   annonce-photos avant la mise en production.
6. Déployer d'abord sur un environnement de prévisualisation Vercel et tester :
   affichage des annonces existantes, changement de pays, publication, photos,
   connexion email, Google OAuth, favoris, messages et administration.

AUTHENTIFICATION ET SÉCURITÉ
- La clé Supabase publishable existante est conservée dans le navigateur.
  Ne jamais ajouter une clé service_role à ce paquet.
- Le contrôle de compte vérifié dans l'interface est un contrôle côté navigateur.
  Il ne remplace pas une vérification côté base de données / RLS.
- La sécurité du stockage des photos dépend aussi des politiques Storage.
- Le fournisseur SMS n'est pas activé par ce paquet. Ne pas activer l'authentification
  téléphonique sans fournisseur SMS configuré et testé.
- Les rôles administrateur codés dans l'interface ne constituent pas, à eux seuls,
  une autorisation sécurisée côté serveur.

LIMITES CONNUES
- La liste des 54 pays est intégrée, mais les villes sont saisies librement.
- La détection initiale du pays dépend des informations régionales disponibles
  dans le navigateur ; l'utilisateur peut modifier le pays manuellement.
- Les monnaies affichées sont celles associées au pays sélectionné ; ce paquet
  ne réalise pas de conversion de change en temps réel.
- Ce paquet a subi une vérification d'intégrité ZIP et une vérification syntaxique
  JavaScript. Il n'a pas subi de test navigateur réel ni de test connecté à Supabase.
  Il ne doit donc pas remplacer directement le site de production sans prévisualisation.
