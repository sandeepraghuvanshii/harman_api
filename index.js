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
router.post('/', async (req, res) => {
  const movieData = req.body;
  const movie = new Movie(movieData);

  // Ensure belongs_to_collection is an ObjectId
  if (movieData.belongs_to_collection && movieData.belongs_to_collection.id) {
    movie.belongs_to_collection = new mongoose.Types.ObjectId(movieData.belongs_to_collection.id);
  }

  try {
    await movie.save();
    res.status(201).send('Movie created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating movie');
  }
});

// Route to get all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching movies');
  }
});

// Route to get a movie by ID
app.get('/movie/:id', async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).send('Movie not found');
    }
  } catch (err ) {
    console.error(err);
    res.status(500).send('Error fetching movie');
  }
});

// Route to update a movie
app.put('/movie/:id', async (req, res) => {
  const movieId = req.params.id;
  const movieData = req.body;

  try {
    const movie = await Movie.findByIdAndUpdate(movieId, movieData, { new: true });
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

// Route to delete a movie
app.delete('/movie/:id', async (req, res) => {
  const movieId = req.params.id;

  try {
    await Movie.findByIdAndRemove(movieId);
    res.status(200).send('Movie deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting movie');
  }
});

// Route to update video links
app.put('/movie/:id/add-quality', async (req, res) => {
  const movieId = req.params.id; // Get the ID from the URL
  const qualityData = req.body; // Get the quality data from the request body

  try {
    // Update the movie document with the new quality fields
    const result = await Movie.updateOne(
      { _id: movieId }, // Filter to find the document by ID
      { $set: qualityData } // Update the fields with the new quality data
    );

    if (result.nModified > 0) {
      res.status(200).send('Quality fields added successfully');
    } else {
      res.status(404).send('Movie not found or no changes made');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating movie');
  }
});

// Route to search movies by title
app.get('/movie/search', async (req, res) => {
  const title = req.query.title;

  try {
    const movies = await Movie.find({ $text: { $search: title } });
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error searching movies');
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
