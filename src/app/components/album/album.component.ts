import { Component, OnInit, OnDestroy } from "@angular/core";
import albumData from "../../data/SearchResultsAlbum.json";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";
//Services
import { MusicDataService } from "src/app/services/music-data.service";
@Component({
  selector: "app-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.css"],
})
export class AlbumComponent implements OnInit, OnDestroy {
  constructor(
    private data: MusicDataService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  album: any;
  private albumIdSub!: Subscription;

  ngOnInit(): void {
    this.albumIdSub = this.route.params.subscribe((params: Params) => {
      this.data.getAlbumById(params["id"]).subscribe((data) => {
        this.album = data;
      });
    });
  }

  addToFavourites(trackID: any) {
    if (this.data.addToFavourites(trackID)) {
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    } else {
      this.snackBar.open("Unable to add song to Favourites", "Done", {
        duration: 1500,
      });
    }
  }

  ngOnDestroy(): void {
    this.albumIdSub?.unsubscribe();
  }
}
