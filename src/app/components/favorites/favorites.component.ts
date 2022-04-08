import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
//Services
import { MusicDataService } from "../../services/music-data.service";
@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.scss"],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Array<any> = [];
  private favSub?: Subscription;

  constructor(private data: MusicDataService) {}
  removeFromFavorites(id: any) {
    this.favSub = this.data
      .removeFromFavourites(id)
      .subscribe((data) => (this.favorites = data.tracks));
  }
  ngOnInit(): void {
    this.favSub = this.data
      .getFavourites()
      .subscribe((data) => (this.favorites = data.tracks));
  }

  ngOnDestroy(): void {
    this.favSub?.unsubscribe();
  }
}
