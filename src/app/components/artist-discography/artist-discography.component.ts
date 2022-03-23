import { Component, OnInit, OnDestroy } from "@angular/core";
import albumData from "../../data/SearchResultsAlbums.json";
import artistData from "../../data/SearchResultsArtist.json";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

//Services
import { MusicDataService } from "../../services/music-data.service";

@Component({
  selector: "app-artist-discography",
  templateUrl: "./artist-discography.component.html",
  styleUrls: ["./artist-discography.component.css"],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  constructor(private data: MusicDataService, private route: ActivatedRoute) {}

  albums: any;
  artist: any;

  private artistIdSub!: Subscription;

  ngOnInit(): void {
    this.artistIdSub = this.route.params.subscribe((params: Params) => {
      this.data
        .getArtistById(params["id"])
        .subscribe((data) => (this.artist = data));
      this.data.getAlbumsByArtistId(params["id"]).subscribe((data) => {
        this.albums = data.items.filter((artist: any, index: any) => {
          return (
            data.items.map((album: any) => album.name).indexOf(artist.name) ===
            index
          );
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.artistIdSub?.unsubscribe();
  }
}
