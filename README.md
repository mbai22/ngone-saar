# Ngoné Saar — Site Pressbook

Site vitrine du duo tchadien **Ngoné Saar** (Arson B & Sheriff), originaire de Sarh.

## Pages

- **Accueil** — Hero, bio, statistiques, discographie, galerie, boutique, blog, booking, press kit
- **À propos** — Profils des artistes, vision, press kit
- **Musique** — EP avec 7 titres, lecteur YouTube
- **Galerie** — Photos + lightbox + carrousel mobile
- **Boutique** — EP, T-shirt, poster, casquette — achats via WhatsApp
- **Blog** — Articles du duo
- **Contact** — Formulaire de réservation + infos

## PWA

Le site est une Progressive Web App :
- `manifest.json` — installation sur mobile/desktop
- `sw.js` — service worker avec stratégie cache-first (assets) / network-first (pages)
- Icônes 192×192 et 512×512

## Stack

- HTML / CSS / JavaScript vanilla
- Google Fonts (Sora, Montserrat, Bebas Neue)
- Font Awesome 6
- Aucun framework

## Déploiement

Hébergement Apache. Le fichier `.htaccess` gère le cache (1 an pour les assets) et la compression gzip.
