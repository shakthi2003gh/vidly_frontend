import React from "react";
import Form from "./common/form";
import { getGenres } from "./../StarterCode/services/genreServices";
import { getMovie, saveMovie } from "./../StarterCode/services/movieServices";
const Joi = require("joi");

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schemaObj = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .label("Number in stock")
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .required()
      .label("Daily rental rate")
      .min(0)
      .max(10),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (e) {
      if (e.response && e.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div className="mt-4">
        <h1>Movie Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number of stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
