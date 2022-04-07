import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
//Services
import { MusicDataService } from "../../services/music-data.service";
@Component({
  selector: "app-new-releases",
  templateUrl: "./new-releases.component.html",
  styleUrls: ["./new-releases.component.scss"],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  constructor(private data: MusicDataService) {}
  releases: Array<any> = [];
  private newReleasesSub!: Subscription;

  ngOnInit(): void {
    this.newReleasesSub = this.data
      .getNewReleases()
      .subscribe((result) => (this.releases = result.albums.items));
  }

  ngOnDestroy(): void {
    this.newReleasesSub?.unsubscribe();
  }
}
