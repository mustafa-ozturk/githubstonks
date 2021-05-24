const handleTest = (req, res) => {
    try {
        return res.status(200).json({ status: 200, message: "this is a test" });
    } catch (error) {
        return res.status(404).json({
            status: 404,
            error: error.message,
        });
    }
};

module.exports = {
    handleTest,
};
