import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MovieDetailsPage implements OnInit {
  movieId: string = ""
  movie: any = null;
  constructor(private readonly route: ActivatedRoute, private readonly movieService: MovieService) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.params['id'];
    this.getMovieDetails();
  }

  getMovieDetails(){
    this.movieService.getMovieDetails(this.movieId).subscribe((movie: any)=>{
      this.movie = movie;
      console.log(this.movie)
    })
  }

  openHomePage(){
    window.open(this.movie.homepage)
  }
}
