import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Services
import { GuardAuthService } from "../app/services/guard-auth.service";

// Components
import { NewReleasesComponent } from "./components/new-releases/new-releases.component";
import { ArtistDiscographyComponent } from "./components/artist-discography/artist-discography.component";
import { AlbumComponent } from "./components/album/album.component";
import { AboutComponent } from "./components/about/about.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SearchResultComponent } from "./components/search-result/search-result.component";
import { FavoritesComponent } from "./components/favorites/favorites.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: "new-releases",
    component: NewReleasesComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: "artist/:id",
    component: ArtistDiscographyComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: "album/:id",
    component: AlbumComponent,
    canActivate: [GuardAuthService],
  },
  { path: "about", component: AboutComponent, canActivate: [GuardAuthService] },
  {
    path: "search",
    component: SearchResultComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: "favourites",
    component: FavoritesComponent,
    canActivate: [GuardAuthService],
  },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/new-releases", pathMatch: "full" },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
