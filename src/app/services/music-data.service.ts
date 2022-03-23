import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

import { SpotifyTokenService } from "./spotify-token.service";

import { mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MusicDataService {
  favoriteList: Array<string> = [];
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
  getArtistById(id: any): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumsByArtistId(id: any): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      })
    );
  }

  getAlbumById(id: any): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  searchArtists(
    searchString: string
  ): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  addToFavourites(id: any) {
    console.log(`ID${id}`);
    if (id != null && this.favoriteList.length < 50) {
      this.favoriteList.push(id);
      console.log(`Favorite List updated as:${this.favoriteList}`);
      return true;
    } else return false;
  }

  removeFromFavourites(id: any): Observable<any> {
    this.favoriteList.splice(this.favoriteList.indexOf(id), 1);
    return this.getFavorites();
  }

  getFavorites(): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        if (this.favoriteList.length > 0) {
          return this.http.get<any>(
            `https://api.spotify.com/v1/tracks?ids=${this.favoriteList.join()}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          return new Observable((o) => {
            o.next([]);
          });
        }
      })
    );
  }
}
