# sketchy
# Sketchy

Un petit site pour apprendre à dessiner le corps, une partie à la fois.

## Ce que fait le site

- **Leçons étape par étape** : tête, yeux, mains, bras, jambes et pieds. Chaque dessin se construit à partir de formes simples, avec des traits de construction puis le contour final.
- **Zone de dessin** : dessine directement sur l'écran avec le doigt, un stylet ou la souris. Crayon avec grain, stylo à largeur variable et gomme. Le modèle de la leçon s'affiche en filigrane pour t'aider.
- **Profil** : publie tes dessins (dessinés sur le site ou photographiés), ajoute un titre et une partie du corps, filtre ta galerie, et suis tes leçons terminées.

## Utilisation

Le site tient dans un seul fichier, `index.html`, sans installation ni serveur.
Ouvre-le dans un navigateur, sur téléphone ou sur PC.

## Données

Tout reste sur l'appareil : le profil est enregistré dans le `localStorage` et les dessins dans `IndexedDB`. Rien n'est envoyé en ligne, donc chaque visiteur ne voit que ses propres dessins.

## Technique

HTML, CSS et JavaScript, sans bibliothèque. Compatible mode clair et sombre.
