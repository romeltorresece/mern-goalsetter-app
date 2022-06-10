const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user._id });

    res.status(200).json(goals);
});

// @desc    Set Goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res, next) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field.');
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user._id
    });

    res.status(200).json(goal);
});

// @desc    Update Goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('No goal found.');
    }
    // Check for user
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(401);
        throw new Error('User not found.');
    }
    
    // Check if user matches goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized.');
    }

    const opts = { new: true, runValidators: true };
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, opts);
    
    res.status(200).json(updatedGoal);
});

// @desc    Delete Goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('No goal found.');
    }
    // Check for user
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(401);
        throw new Error('User not found.');
    }
    
    // Check if user matches goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized.');
    }

    const deletedGoal = await goal.remove();

    res.status(200).json({ _id: deletedGoal._id });
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
};