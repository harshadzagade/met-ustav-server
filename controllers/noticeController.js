const Notice = require('../models/Notice');
const Institute = require('../models/Institute');


exports.addNotice = async (req, res) => {
    try {
        const notice = await Notice.create(req.body);
        res.status(201).json(notice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllNotices = async (req, res) => {
    try {
        const notices = await Notice.findAll({
            include: [{ model: Institute, as: 'Institutes' }],
        });
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getNoticeById = async (req, res) => {
    try {
        const id = req.params.id;
        const notice = await Notice.findByPk(id);
        if (!notice) {
            res.status(404).json({ message: 'Notice not found' });
        } else {
            res.json(notice);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateNotice = async (req, res) => {
    try {
        const id = req.params.id;
        const notice = await Notice.findByPk(id);
        if (!notice) {
            res.status(404).json({ message: 'Notice not found' });
        } else {
            
            const updatedNotice = await notice.update(req.body, {
                where: { id },
                returning: true
            })
            await updatedNotice.save();
            res.json(updatedNotice);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteNotice = async (req, res) => {
    try {
        const id = req.params.id; 
        const notice = await Notice.findByPk(id);
        if (!notice) {
            res.status(404).json({ message: 'Notice not found' });
        } else {
            await notice.destroy();
            res.json({ message: 'Notice deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

