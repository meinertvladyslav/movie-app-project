import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'movie-details',
    loadComponent: () => import('./pages/movie-details/movie-details.page').then( m => m.MovieDetailsPage)
  },
  {
    path: 'favourites',
    loadComponent: () => import('./pages/favourites/favourites.page').then( m => m.FavouritesPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
   {
    path: 'movie/:id',
    loadComponent: () =>
      import('./pages/movie-details/movie-details.page').then(m => m.MovieDetailsPage)
  },
  {
  path: 'favourites',
  loadComponent: () =>
    import('./pages/favourites/favourites.page').then(m => m.FavouritesPage)
}
];
