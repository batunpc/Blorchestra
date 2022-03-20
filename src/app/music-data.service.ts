import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { SpotifyTokenService } from "./spotify-token.service";

import { mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MusicDataService {
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(
          "https://api.spotify.com/v1/browse/new-releases",
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }
}
