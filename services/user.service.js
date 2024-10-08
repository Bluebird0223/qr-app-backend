const { ObjectId } = require("mongodb");
const User = require("../models/user.model");

const userService = {
  getLatestCreatedRecord: async () => {
    try {
      return await User.find({}).sort({ createdAt: -1 }).limit(1);
    } catch (error) {
      throw error
    }
  },
  createUser: async (dataToInsert) => {
    try {
      return await User.create(dataToInsert);
    } catch (error) {
      throw error;
    }
  },
  getUserByObjectId: async (id) => {
    try {
      return await User.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw error
    }
  },
  getAdminUser: async () => {
    try {
      return await User.findOne({ name: "admin" }, { _id: 1 })
    } catch (error) {
      throw error
    }
  },
  getUserByUserId: async (userId) => {
    try {
      return await User.findOne({ userId });
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (id, dataToUpdate) => {
    try {
      return await User.updateOne({ _id: new ObjectId(id) }, { "$set": dataToUpdate });
    } catch (error) {
      throw error;
    }
  },
  getUserByName: async (name) => {
    try {
      return await User.findOne({ name: name })
    } catch (error) {
      throw error
    }
  },
  getActiveUsers: async () => {
    try {
      return await User.find({ isActive: true }, { name: 1 }).sort({ name: -1 })
    } catch (error) {
      throw error;
    }
  },
  getUserDetailsList: async () => {
    try {
      return await User.find({ isActive: true })
    } catch (error) {
      throw error
    }
  }
};

module.exports = userService;
