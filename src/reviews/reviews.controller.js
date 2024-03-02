const service = require("./reviews.service"); // import service file
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("score", "content");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId)
    
    if(review) {
        res.locals.review = review;
        return next();
    }
    return next({ status: 404, message: `Review cannot be found.` })
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
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: response.locals.review.review_id,
      };
      const data = await service.update(updatedReview);
      res.json({ data });
}

async function destroy(req, res, next) {
    await service.delete(res.locals.review.review_id);
    res.sendStatus(204);
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), hasScoreAndContent, hasRequiredProperties, asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}