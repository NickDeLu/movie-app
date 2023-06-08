import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonicModule, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class MoviesPage implements OnInit {
  movies: any[] = [];
  currentPage = 1;

  constructor(private readonly movieService: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
   this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadingCtrl.create({
      message: 'Loading movies...',
      spinner: 'bubbles'
    });
    await loading.present();
    this.movieService.getTopRatedMovies(this.currentPage).subscribe(res =>{
      this.movies.push(...res.results);
      loading.dismiss();
      event?.target.complete()
      if(event){
        event.target.disabled = res.total_pages === this.currentPage;
      }
    })
  }

  loadMoreMovies(event: any) {
    this.currentPage += 1;
    this.loadMovies(event);
  }
}
