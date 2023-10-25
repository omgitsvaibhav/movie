import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsCtrl {
    static async apiPostReview(req, res, next) {
        try {
          const movieId = req.body.movieId;
          const review = req.body.review;
          const user = req.body.user;

          const reviewResponse = await ReviewsDAO.addReview(
            movieId,
            user,
            review
          );
          res.json({ status: "success" });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
    }

    static async apiGetReview(req, res, next) {
      try {
        const id = req.params.id || {};
        const reviews = await ReviewsDAO.getReview(id);
        if (!reviews) {
          res.status(404).json({ error: "Not found" });
          return;
        }
        res.json(reviews);
      } catch (e) {
        console.log(`api, ${e}`);
        res.status(500).json({ error: e });
      }
    }

    static async apiGetReviewByMovieId(req, res, next) {
      try {
        const movieId = req.params.id ;
        const reviews = await ReviewsDAO.getReviewByMovieId(movieId);
        if (!reviews) {
          res.status(404).json({ error: "Not found" });
          return;
        }
        res.json(reviews);
      } catch (e) {
        console.log(`api, ${e}`);
        res.status(500).json({ error: e });
      }
    }

    static async apiUpdateReview(req, res, next) {
        try {
        const reviewId = req.params.id;
        const review = req.body.review;
        const user = req.body.user;

        const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
        );

        var { error } = reviewResponse;
        if (error) {
          res.status(400).json({ error });
          return;
        }

        if (reviewResponse.modifiedCount === 0) {
            throw new Error("unable to update");
        }

        res.json({ status: "success"});
    } catch(e){
        console.error(`Unable to update review: ${e}`);
        res.status(500).json({error: e.message});
    }
}

static async apiDeleteReview(req, res, next) {
    try {
    const reviewId = req.params.id;
    const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
    //ReviewsDAO.deleteReview(reviewId);
    res.json({ status: "success" });
    } catch(e) {
    res.status(500).json({ error: e.message });
    }
    }
}