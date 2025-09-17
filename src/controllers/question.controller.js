const questionServices = require('../services/question.services');

async function questionCreate(req, res, next) {
    try {
        const { questionName, optionA, optionB, optionC, optionD, ans } = req.body;
        const questionPaper = await questionServices.questionCreate(questionName, optionA, optionB, optionC, optionD, ans);
        return res.status(201).json({ succes: true, data: questionPaper })
    } catch (err) {
        next(err);
    }

}

async function getQuestionData(req, res, next) {
    try {
        const questionData = await questionServices.getQuestionData();
        return res.status(200).json({ succes: true, data: questionData })
    } catch (err) {
        next(err);
    }
}

async function getQuestionById(req, res, next) {
    try {
        const { id } = req.params;
        const question = await questionServices.getQuestionById(id);
        return res.status(200).json({ succes: true, data: question })
    } catch (err) {
        next(err)
    }
}
async function deleteByIdQuestion(req, res, next) {
    try {
        const { id } = req.params;
        const deleteQuestion = await questionServices.deleteByIdQuestion(id);
        return res.status(200).json({ succes: true, data: deleteQuestion })
    } catch (err) {
        next(err);
    }
}
module.exports = {
    questionCreate,
    getQuestionData,
    getQuestionById,
    deleteByIdQuestion
};