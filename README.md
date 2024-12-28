# Phototheque

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/RusselTano/Phototheque)


# BrowserSync

Ah, je vois le problème ! Ce comportement arrive souvent avec **Browser-Sync** quand la configuration du **proxy** n'est pas faite correctement. Ne t'inquiète pas, on va régler ça pour qu'il fonctionne comme prévu. 😊

---

### **Pourquoi ça arrive ?**
Ce problème survient parce que tu as utilisé une mauvaise syntaxe dans l'URL de ton proxy dans le script **Browser-Sync**. Si tu observes l'URL `http://localhost:3000/'localhost:5500'`, les guillemets sont interprétés littéralement au lieu de pointer correctement vers ton serveur Express.

---

### **Correction de la configuration Browser-Sync**

Voici la bonne façon de configurer **Browser-Sync** avec un proxy pour ton serveur Express.

#### **Étape 1 : Mise à jour du script `sync` dans `package.json`**
Dans ton `package.json`, ajuste la commande **Browser-Sync** pour corriger l'URL. Utilise cette configuration :

```json
"scripts": {
  "start": "nodemon index.js", // Démarre Express avec nodemon
  "sync": "browser-sync start --proxy localhost:5500 --files 'views/**/*.ejs, public/**/*.*'"
}
```

- **`--proxy localhost:5500`** : Redirige Browser-Sync pour utiliser ton serveur Express (qui tourne sur le port 5500).
- **`--files`** : Surveille les fichiers EJS et tout fichier dans le dossier `public`.

> **Important :** Pas besoin de mettre des guillemets autour de `localhost:5500`. Sinon, cela casse la configuration.

---

#### **Étape 2 : Démarrer Browser-Sync**
1. Lance ton serveur Express :
   ```bash
   npm run start
   ```

2. Démarre **Browser-Sync** avec le script `sync` :
   ```bash
   npm run sync
   ```

3. Accède à l'URL générée par **Browser-Sync** (par défaut, `http://localhost:3000`).

---

#### **Étape 3 : Résultat attendu**
- **Browser-Sync** va servir ton projet en proxy via `http://localhost:3000`.
- Le contenu est synchronisé avec ton serveur Express qui tourne sur `http://localhost:5500`.
- À chaque modification dans les fichiers `.ejs`, CSS ou JS :
  - **Browser-Sync** recharge automatiquement le navigateur.
  - Les fichiers surveillés (`views/**/*.ejs` et `public/**/*.*`) déclenchent un rafraîchissement.

---

### **Si le problème persiste : Debug Browser-Sync**
Si ça ne fonctionne toujours pas, vérifie les points suivants :
1. **Est-ce que ton serveur Express tourne bien sur `localhost:5500` ?**
   - Accède à `http://localhost:5500` directement dans ton navigateur pour confirmer.
2. **Recrée la configuration Browser-Sync depuis zéro** :
   Installe `browser-sync` localement pour éviter des conflits avec une installation globale :
   ```bash
   npm install browser-sync --save-dev
   ```

   Et remplace le script `sync` par :
   ```json
   "sync": "npx browser-sync start --proxy http://localhost:5500 --files 'views/**/*.ejs, public/**/*.*'"
   ```

---

### **Alternative : Utiliser `nodemon` avec livereload**
Si **Browser-Sync** te cause trop de soucis, tu peux simplement revenir à une solution plus simple avec `livereload` et `connect-livereload` (voir ma solution précédente).

---

Essaie ces corrections et dis-moi si ça fonctionne comme prévu. 😊