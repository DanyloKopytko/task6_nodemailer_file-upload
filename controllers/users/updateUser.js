const { userService } = require('../../service');

module.exports = async (req, res) => {
    try {
        const { user_id } = req.params;
        const dataToUpdate = req.body;
        const { id: userIdFromToken } = req.user;

        if (+user_id !== userIdFromToken) {
            throw new Error('This is not your page, invader');
        }

        await userService.update(dataToUpdate, user_id);

        res.redirect(`/users/${user_id}`);
    } catch (e) {
        res.status(400).json(e.message);
    }
};