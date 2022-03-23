import { Component, OnInit, OnDestroy } from "@angular/core";
import albumData from "../../data/SearchResultsAlbums.json";
import artistData from "../../data/SearchResultsArtist.json";
import { MusicDataService } from "../../services/music-data.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-artist-discography",
  templateUrl: "./artist-discography.component.html",
  styleUrls: ["./artist-discography.component.css"],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  constructor(private data: MusicDataService, private route: ActivatedRoute) {}

  albums: any;
  artist: any;

  private idSub: any;

  ngOnInit(): void {
    /*    this.artist = artistData;
    this.albums = albumData.items.filter(
      (curValue, index, self) =>
        self.findIndex(
          (t) => t.name.toUpperCase() === curValue.name.toUpperCase()
        ) === index
    ); */
    this.route.params.subscribe((params: Params) => {
      this.idSub = this.data
        .getArtistById(params["id"])
        .subscribe((data) => (this.artist = data));
      this.data.getAlbumsByArtistId(params["id"]).subscribe((data) => {
        this.albums = data.items.filter((el: any, index: any) => {
          return (
            data.items.map((album: any) => album.name).indexOf(el.name) ===
            index
          );
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.idSub?.unsubscribe();
  }
}
