const Institute = require('../models/Institute');


exports.addInstitute = async (req, res) => {
    try {
        const { name } = req.body;
        const institute = await Institute.create({ name });
        res.json(institute);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllInstitutes = async (req, res) => {
    try {
        const institutes = await Institute.findAll();
        res.json(institutes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getInstituteById = async (req, res) => {
    try {
        const id = req.params.id;
        const institute = await Institute.findByPk(id);
        if (!institute) {
            res.status(404).json({ message: 'Institute not found' });
        } else {
            res.json(institute);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateInstitute = async (req, res) => {
    try {
        const id = req.params.id;
        const institute = await Institute.findByPk(id);
        if (!institute) {
            res.status(404).json({ message: 'Institute not found' });
        } else {
            institute.name = req.body.name;
            await institute.save();
            res.json(institute);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteInstitute = async (req, res) => {
    try {
        const id = req.params.id; 
        const institute = await Institute.findByPk(id);
        if (!institute) {
            res.status(404).json({ message: 'Institute not found' });
        } else {
            await institute.destroy();
            res.json({ message: 'Institute deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

