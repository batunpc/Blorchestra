import { Component, OnInit } from "@angular/core";
import albumData from "../data/SearchResultsAlbums.json";
import artistData from "../data/SearchResultsArtist.json";

@Component({
  selector: "app-artist-discography",
  templateUrl: "./artist-discography.component.html",
  styleUrls: ["./artist-discography.component.css"],
})
export class ArtistDiscographyComponent implements OnInit {
  constructor() {}

  albums: any;
  artist: any;

  ngOnInit(): void {
    this.artist = artistData;
    this.albums = albumData.items.filter(
      (curValue, index, self) =>
        self.findIndex(
          (t) => t.name.toUpperCase() === curValue.name.toUpperCase()
        ) === index
    );
  }
}
