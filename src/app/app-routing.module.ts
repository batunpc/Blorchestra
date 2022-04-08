import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//Components
import { NewReleasesComponent } from "./components/new-releases/new-releases.component";
import { ArtistDiscographyComponent } from "./components/artist-discography/artist-discography.component";
import { AlbumComponent } from "./components/album/album.component";
import { AboutComponent } from "./components/about/about.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SearchResultComponent } from "./components/search-result/search-result.component";
import { FavoritesComponent } from "./components/favorites/favorites.component";
import { RegisterComponent } from "./components/register/register.component";
const routes: Routes = [
  {
    path: "new-releases",
    component: NewReleasesComponent,
  },
  {
    path: "artist/:id",
    component: ArtistDiscographyComponent,
  },
  {
    path: "album/:id",
    component: AlbumComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "search",
    component: SearchResultComponent,
  },
  {
    path: "favorites",
    component: FavoritesComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "", // initial relative component
    redirectTo: "/new-releases",
    pathMatch: "full",
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
