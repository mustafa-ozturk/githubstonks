const { stonkData, createUser } = require("./utils");

const stonkDataArr = stonkData();

const handleTest = (req, res) => {
    try {
        return res.status(200).json({ status: 200, message: "this is a test" });
    } catch (error) {
        return res.status(404).json({
            status: 500,
            error: error.message,
        });
    }
};

const handleCards = (req, res) => {
    try {
        return res.status(200).json({ data: stonkDataArr });
    } catch (error) {
        return res.status(404).json({
            status: 500,
            error: error.message,
        });
    }
};

module.exports = {
    handleTest,
    handleCards,
};
