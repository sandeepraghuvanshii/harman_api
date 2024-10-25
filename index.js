const express = require("express");
const mongoose = require("mongoose");
const { Movie, TVShow } = require("./models");

const port = 3000;
mongoose.connect(
  "mongodb+srv://Harman:Harman9696@cluster0.f3qys.mongodb.net/Harman?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();
app.use(express.json());

app.listen(port,()=>{
  console.log("Hello");
});
// Create a new movie
app.post("/movies", async (req, res) => {
  let { id, ...otherFields } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const movie = new Movie({ custom_id: id.toString(), ...otherFields });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Movie with this custom ID already exists" });
    }
    res.status(400).json({ message: error.message });
  }
});




// Get all movies
app.get("/movies", (req, res) => {
  Movie.find()
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// Find by id
app.get("/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      res.status(404).send({ message: "Movie not found" });
      return;
    }
    res.send(movie);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Update a Movie
app.put('/movies/:movieId', async (req, res) => {
  const movieId = req.params.movieId;
  const updateData = req.body;

  try {
    const movie = await Movie.findByIdAndUpdate(movieId, updateData, { new: true });
    if (movie) {
      res.status(200).send('Movie updated successfully');
    } else {
      res.status(404).send('Movie not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating movie');
  }
});

// Delete a movie
app.delete("/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) {
      res.status(404).send({ message: "Movie not found" });
      return;
    }

    res.status(200).send({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Same CRUD methods for TVShow model
app.post("/tvshows", (req, res) => {
  const tvShowData = req.body;

  const tvShow = new TVShow(tvShowData);

  tvShow
    .save()
    .then((savedTvShow) => {
      res.status(201).send(savedTvShow);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/tvshows", (req, res) => {
  TVShow.find()
    .then((tvShows) => {
      res.send(tvShows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/tvshows/:id", (req, res) => {
  TVShow.findById(req.params.id)
    .then((tvShow) => {
      if (!tvShow) {
        res.status(404).send("TV Show not found");
      } else {
        res.send(tvShow);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/tvshows/:id", (req, res) => {
  TVShow.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((tvShow) => {
      res.send(tvShow);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete("/tvshows/:id", (req, res) => {
  TVShow.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send("TV Show deleted successfully");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
