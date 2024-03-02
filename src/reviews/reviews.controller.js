const service = require("./reviews.service"); // import service file

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