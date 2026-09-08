import Group from '../models/Group.js';
import User from '../models/User.js';

export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: 'Group name is required',
      });
    }

    const group = await Group.create({
      name: name.trim(),
      createdBy: req.user,
      members: [req.user],
    });

    res.status(201).json({
      message: 'Group created successfully',
      group,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create group',
      error: error.message,
    });
  }
};


export const getMyGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      members: req.user,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Groups fetched successfully',
      groups,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch groups',
      error: error.message,
    });
  }
};

export const addMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        message: 'Email is required',
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        message: 'Group not found',
      });
    }

    const isMember = group.members.some(
      member => member.toString() === req.user.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: 'You are not a member of this group',
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const alreadyMember = group.members.some(
      member => member.toString() === user._id.toString()
    );

    if (alreadyMember) {
      return res.status(400).json({
        message: 'User is already a member of this group',
      });
    }

    group.members.push(user._id);

    await group.save();

    return res.status(200).json({
      message: 'Member added successfully',
      group,
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Failed to add member',
      error: error.message,
    });
  }
};