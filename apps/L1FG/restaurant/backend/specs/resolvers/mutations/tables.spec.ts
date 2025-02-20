/* eslint-disable */

import { GraphQLResolveInfo } from "graphql";
import { Table } from "../../../src/models";
import { addTable, updateTable, deleteTable } from "../../../src/resolvers/mutations";

// Mock the Table model
jest.mock("../../../src/models/table", () => ({
  Table: {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));


describe("Table Mutation Resolvers", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addTable", () => {
    it("should create a new table successfully", async () => {
      // Arrange
      const mockTable = { _id: "table1", name: "Table 1", qrCodeUrl: "https://qr.example.com/table1" };
      (Table.create as jest.Mock).mockResolvedValue(mockTable);

        if (!addTable) return;
      // Act
      const result = await addTable(
        {},
        { name: "Table 1", qrCodeUrl: "https://qr.example.com/table1" },
        {},
        {} as GraphQLResolveInfo
      );
      
      // Assert
      expect(Table.create).toHaveBeenCalledWith({ 
        name: "Table 1", 
        qrCodeUrl: "https://qr.example.com/table1" 
      });
      expect(result).toEqual(mockTable);
    });


  });

  describe("updateTable", () => {
    it("should update a table successfully", async () => {
      // Arrange
      const mockTable = { 
        _id: "table1", 
        name: "Updated Table", 
        qrCodeUrl: "https://qr.example.com/updated" 
      };
      (Table.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockTable);
      
      if (!updateTable) return;
      const result = await updateTable(
        {},
        { id: "table1", name: "Updated Table", qrCodeUrl: "https://qr.example.com/updated" },
        {} ,
        {} as GraphQLResolveInfo
      );
      
      // Assert
      expect(Table.findByIdAndUpdate).toHaveBeenCalledWith(
        "table1",
        { name: "Updated Table", qrCodeUrl: "https://qr.example.com/updated" },
        { new: true }
      );
      expect(result).toEqual(mockTable);
    });

   
  });

  describe("deleteTable", () => {
    it("should delete a table successfully", async () => {
      // Arrange
      const mockTable = { _id: "table1", name: "Table 1", qrCodeUrl: "https://qr.example.com/table1" };
      (Table.findByIdAndDelete as jest.Mock).mockResolvedValue(mockTable);
      
      if (!deleteTable) return;
      const result = await deleteTable(
        {},
        { id: "table1" },
        {} ,
        {} as GraphQLResolveInfo
      );
      
      // Assert
      expect(Table.findByIdAndDelete).toHaveBeenCalledWith("table1");
      expect(result).toEqual(mockTable);
    });

    it("should throw an error when table not found", async () => {
      // Arrange
      (Table.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
      
      if (!deleteTable) return;
      await expect(
        deleteTable(
          {},
          { id: "nonexistent" },
          {} ,
          {} as GraphQLResolveInfo
        )
      ).rejects.toThrow("Table not found.");
    });

  
  });
});