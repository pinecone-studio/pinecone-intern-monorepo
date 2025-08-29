const mongoose = jest.requireActual('mongoose');

const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id) || /^[0-9a-fA-F]{8}[0-9a-fA-F]{16}$/.test(id);
};

interface MockModelData {
  [key: string]: unknown;
}

class MockModel {
  [key: string]: unknown;
  
  constructor(data: MockModelData) {
    Object.assign(this, data);
    this._id = this._id || '507f1f77bcf86cd799439011';
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = this.updatedAt || new Date();
  }
  
  save = jest.fn().mockResolvedValue(this);
}

const mongooseMock = {
  ...mongoose,
  connect: jest.fn().mockResolvedValue({}),
  connection: {
    readyState: 1
  },
  Types: {
    ...mongoose.Types,
    ObjectId: {
      ...mongoose.Types.ObjectId,
      isValid: jest.fn().mockImplementation(isValidObjectId)
    }
  },
  model: jest.fn(() => MockModel),
  Schema: mongoose.Schema
};

export default mongooseMock;