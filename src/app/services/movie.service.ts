import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  page: number;
  results:  any[];
  total_pages: number;
  total_results: number;
}


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private readonly http:  HttpClient) { }

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`)
    .pipe(
      map(res => {
        res.results.map(movie => {
          movie.imagePath = environment.imageUrl + '/w92' + movie.poster_path
          console.log(movie.imagePath)
          return movie;
        });
        return res
      })
    )
  }

  getMovieDetails(id: string){
    return this.http.get<any>(`${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`)
    .pipe(map(movie=>{
      movie.imagePath = environment.imageUrl + '/w400' + movie.poster_path;
      return movie
    }))
  }
}
