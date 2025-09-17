const prisma = require('../prisma/client')

async function questionCreate(questionName, optionA, optionB, optionC, optionD, ans) {

    if (!questionName || !optionA || !optionB || !optionC || !optionD || !ans) {
        const err = new Error('question info are required')
        err.status = 400;
        throw err;
    }

    const questionPaper = await prisma.questionPaper.create({
        data: {
            questionName, optionA, optionB, optionC, optionD, ans
        }
    })
    return questionPaper;
}

async function getQuestionData() {
    try {
        const questions = await prisma.questionPaper.findMany();
        return questions;
    } catch (err) {
        throw new Error('data is not fetch')
    }
}

async function getQuestionById(id) {

    if (!id) {
        const err = new Error('question id is required');
        err.status = 400;
        throw err;
    }
    const question = await prisma.questionPaper.findUnique({
        where: { id: Number(id) }
    })
    if (!question) {
        const err = new Error('question id is not exist');
        err.status = 404;
        throw err;
    }
    return question;

}

async function deleteByIdQuestion(id) {
    if (!id) {
        const err = new Error('id is required');
        err.status = 404;
        throw err;
    }

    const deletQuestion = await prisma.questionPaper.delete({
        where: { id: Number(id) }
    })
    console.log("deletQuestion", deletQuestion)
    if (deletQuestion) {
        const err = new Error('quesion id is not exist');
        err.status = 404;
        throw err;
    }
    return deletQuestion;
}


module.exports = {
    questionCreate,
    getQuestionData,
    getQuestionById,
    deleteByIdQuestion
}