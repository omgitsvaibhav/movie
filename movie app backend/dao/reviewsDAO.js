import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db("reviews").collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO:${e}`);
    }
}

static async addReview(movieId, user, review){
    try{
        const reviewDoc = await reviews.insertOne({
            movieId: movieId,
            user: user,
            review: review
        });

        return reviewDoc;
    } catch(e){
        console.error(`unable to post review: ${e}`);
        return {error:e}
    }
}

static async getReview(reviewId){
    try{
    const objectId = new ObjectId(reviewId); // Instantiate ObjectId using the 'new' keyword
     return await reviews.findOne({ _id: objectId });
    } catch(e){
        console.error(`unable to get review: ${e}`);
        return{error:e};
    }
}

static async updateReview(reviewId, user, review){
    //console.log("rev", reviewId);
    try{
        const objectId = new ObjectId(reviewId);
        const updateResponse = await reviews.updateOne(
            {_id: objectId},
            {$set: {user: user, review: review}}
        );

        return updateResponse;
    } catch(e){
        console.error(`unable to update review: ${e}`);
        return{error:e};
    }
}

static async deleteReview(reviewId){
    try{
        const objectId = new ObjectId(reviewId);
        const deleteResponse = await reviews.deleteOne({
            _id : objectId
        }); 

        return deleteResponse;
    }catch(e){
        console.error(`unable to delete review: ${e}`);
        return{error:e};
    }
}

static async getReviewByMovieId(movieId) {
    try {
      const cursor = await reviews.find({ movieId: parseInt(movieId) });
      return cursor.toArray();
    } catch (e) {
      console.error(`Unable to get reviews: ${e}`);
      return { error: e };
    }
  }
  
}