import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Fetch movies via API and set movies state to returned JSON file
   * @returns array holding movies objects
   * @function getMovies
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * Fetch user info via API and set favorites state to returned JSON file
   * @returns array holding IDs of favorites
   * @function getFavoriteMovies
   */

  getFavoriteMovies(): any {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favorites = resp;
    });
  }

  /**
   * Adds a movie to a user's favorites via an API call
   * @param {string} id
   * @function addToFavorite
   */

  addFavorites(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie has been added', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Removes a movie from a user's favorites via an API call
   * @param {string} id
   * @function removeFromFavorite
   */

  removeFavorites(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie has been removed', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Checks if a movie is included in a user's favorite movies
   * @param {string} id
   * @returns boolean
   * @function movieIsFavorite
   */

  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  toggleFavorite(id: string): void {
    if (this.isFavorite(id)) {
      this.removeFavorites(id);
    } else {
      this.addFavorites(id);
    }
  }

  /**
   * Opens movie details from MovieDetailsComponent
   * @param {Movie} movie
   * @function openMovieDetails
   */

  openDetails(movie: any): void {
    const { Name, Description } = movie;
    this.dialog.open(MovieDetailsComponent, {
      data: { Name, Description },
      width: '25rem',
    });
  }

  /**
   * Opens genre information from GenreComponent
   * @param {Movie} movie
   * @function openGenre
   */

  openGenre(movie: any): void {
    const { Name, Description } = movie.Genre;
    this.dialog.open(GenreComponent, {
      data: { Name, Description },
      width: '25rem',
    });
  }

  /**
   * Opens director information from DirectorComponent
   * @param {Movie} movie
   * @function openDirector
   */

  openDirector(movie: any): void {
    const { Name, Birth, Bio } = movie.Director;
    this.dialog.open(DirectorComponent, {
      data: {
        Name,
        Birth,
        Bio,
      },
      width: '25rem',
    });
  }
}
