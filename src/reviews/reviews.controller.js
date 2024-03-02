const service = require("./reviews.service"); // import service file
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("score", "content");

async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    next({ status: 404, message: "Review cannot be found." });
}

function hasScoreAndContent(req, res, next) {
    const { data: { score, content } = {} } = req.body;
    let updateReview = {};
    if(!score && !content) {
        return next({ status: 40, message: `Missing score and/or content!`});
    }
    if (score) {
        updateReview.score = score;
    }
    if (content) {
        updateReview.content = content;
    }
    res.locals.update = updateReview;
    next();
}

async function update(req, res, next) {
    const review = res.locals.review.review_id;
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
      };
      await service.update(updatedReview);
      res.json({ data: await service.read(review) });
}

async function destroy(req, res, next) {
    await service.delete(res.locals.review.review_id);
    res.sendStatus(204);
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}