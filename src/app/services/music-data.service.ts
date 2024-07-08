import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from 'src/environments/environment';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  private getHeaders(token?: string): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: this.getHeaders(token) }
        );
      })
    );
  }

  getArtistById(id: any): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, {
          headers: this.getHeaders(token),
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
            headers: this.getHeaders(token),
          }
        );
      })
    );
  }

  getAlbumById(id: any): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {
          headers: this.getHeaders(token),
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
          { headers: this.getHeaders(token) }
        );
      })
    );
  }

  addToFavourites(id: string): Observable<[String]> {
    const url = `${environment.userAPIBase}/favourites/${id}`;
    return this.http.put<[String]>(url, {}, { headers: this.getHeaders() });
  }

  removeFromFavourites(id: string): Observable<any> {
    return this.http
      .delete<[String]>(`${environment.userAPIBase}/favourites/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        mergeMap(() => {
          return this.getFavourites();
        })
      );
  }

  getFavourites(): Observable<SpotifyApi.MultipleTracksResponse> {
    return this.http
      .get<[String]>(`${environment.userAPIBase}/favourites/`, {
        headers: this.getHeaders(),
      })
      .pipe(
        mergeMap((favouritesArray) => {
          if (favouritesArray.length > 0) {
            return this.spotifyToken.getBearerToken().pipe(
              mergeMap((token) => {
                return this.http.get<any>(
                  `https://api.spotify.com/v1/tracks?ids=${favouritesArray.join()}`,
                  { headers: this.getHeaders(token) }
                );
              })
            );
          }
          return new Observable((o) => o.next({ tracks: [] }));
        })
      );
  }
}
