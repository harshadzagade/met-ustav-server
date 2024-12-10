const express = require('express');
const Role = require('../models/Role');

exports.createRole = async (req, res) => {
    try {
        const { name } = req.body;
        const role = await Role.create({ name });
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await Role.findByPk(id);
        if (!role) {
            res.status(404).json({ message: 'Role not found' });
        } else {
            res.json(role);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        const role = await Role.findByPk(id);
        if (!role) {
            res.status(404).json({ message: 'Role not found' });
        } else {
            role.name = name;
            await role.save();
            res.json(role);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await Role.findByPk(id);
        if (!role) {
            res.status(404).json({ message: 'Role not found' });
        } else {
            await role.destroy();
            res.json({ message: 'Role deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};