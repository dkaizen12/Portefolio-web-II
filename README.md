# 🧑‍💼 Portfolio — Dady Kalangoso

Portfolio personnel multi-profil développé en HTML/CSS/JS. Pensé pour s'adapter dynamiquement à différents postes cibles sans changer de page.

---

## 📁 Structure du projet

```
portfolio/
├── index.html       # Structure HTML de la page
├── style.css        # Styles et thème (clair/sombre)
└── script.js        # Logique dynamique, profils, animations
```

---

## ✨ Fonctionnalités

- **Multi-profil dynamique** — 12 profils métier sélectionnables (Product Owner, Dev Web, Data Analyst, QA, Support IT…). Le contenu (tagline, À propos, compétences, projets) se met à jour sans rechargement.
- **Mode sombre / clair** — bascule via le bouton en header, respecte la préférence système par défaut.
- **Animations au scroll** — révélation progressive des sections via `IntersectionObserver`.
- **Compteurs animés** — chiffres clés animés à l'entrée dans le viewport.
- **Carrousel édito** — 3 slides avec navigation manuelle et défilement automatique (5s).
- **Cartes projets flip** — effet retournement 3D au survol révélant la description et les tags.
- **Formulaire de contact** — validation en temps réel (blur) et à la soumission, message de succès simulé.
- **Menu responsive** — hamburger mobile avec overlay et fermeture au clic sur lien.
- **Accessibilité** — skip link, rôles ARIA, `aria-label`, navigation clavier.

---

## 🚀 Lancement

Aucune dépendance, aucun build requis. Ouvrir directement dans un navigateur :

```bash
# Option 1 — double-clic sur index.html
# Option 2 — serveur local (recommandé)
npx serve .
# ou
python -m http.server 8000
```

---

## 🎨 Personnalisation

### Changer les couleurs

Les variables CSS sont centralisées en haut de `style.css` :

```css
:root {
  --accent: #c8502a;   /* couleur principale */
  --accent2: #e8a87c;  /* couleur secondaire */
  --bg: #f5f2ee;       /* fond clair */
}
```

### Ajouter / modifier un profil

Dans `script.js`, ajouter une entrée dans l'objet `profils` :

```js
"mon-profil": {
  hero: "Tagline · Compétence 1 · Compétence 2",
  about: [
    "Premier paragraphe de présentation.",
    "Deuxième paragraphe (optionnel)."
  ],
  skills: ["Compétence A", "Compétence B"],
  projects: [
    {
      emoji: "🚀",
      title: "Nom du projet",
      subtitle: "Catégorie",
      description: "Description courte du projet.",
      tags: ["Tag1", "Tag2"]
    }
  ]
}
```

Puis ajouter l'option correspondante dans le `<select>` d'`index.html` :

```html
<option value="mon-profil">Mon Profil</option>
```

### Ajouter une photo de profil

Remplacer dans `index.html` :

```html
<!-- Remplacer le bloc .profile-img-placeholder par : -->
<img class="profile-img" src="assets/photo.jpg" alt="Photo de profil de Dady Kalangoso" />
```

---

## 🛠️ Technologies

| Technologie | Usage |
|---|---|
| HTML5 sémantique | Structure et accessibilité |
| CSS3 (variables, grid, animations) | Mise en page et thème |
| JavaScript ES6+ vanilla | Logique dynamique |
| Font Awesome 6 | Icônes |
| Google Fonts (Playfair Display, DM Sans) | Typographie |

---

## 📬 Contact

**Dady Kalangoso**
- 📧 dady.kalangosokangela@epfedu.fr
- 📞 06 95 12 84 43
- 📍 Dampmart, Île-de-France
- 🔗 [LinkedIn](https://www.linkedin.com/in/kalangosod/)
- 🐙 [GitHub](https://github.com/dkaizen12)

---

*Portfolio développé sans framework — HTML, CSS et JS natifs uniquement.*