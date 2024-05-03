import { getEmployeeId } from '../../src/graphql/resolvers/queries/get-employee-id';
import EmployeeModel from '../../src/graphql/model/employee';
import { errorTypes, graphqlErrorHandler } from '../../src/graphql/resolvers/error';

jest.mock('../../src/graphql/model/employee');

describe("getEmployeeId", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return filtered employees based on department and ladder level', async () => {
        const id = "123";
        const employeeData = {
            _id: id,
            department: "engineering",
            ladderLevel: "2",
        };
        const filteredWorkers = [
            {
                _id: "456",
                department: "engineering",
                ladderLevel: "1",
            },
        ];
        (EmployeeModel.findById as jest.Mock).mockResolvedValueOnce(employeeData);
        (EmployeeModel.find as jest.Mock).mockResolvedValueOnce(filteredWorkers);

        const result = await getEmployeeId({},  { id });

        expect(result).toEqual(filteredWorkers);
        expect(EmployeeModel.find).toHaveBeenCalledWith({
            department: "engineering",
            ladderLevel: { $in: ["3", "1", "2"], $ne: "2" }
        });
    });

    it('should return HR employees from the back office if no filtered employees are found', async () => {
        const id = "123";
        const employeeData = {
            _id: id,
            department: "engineering",
            ladderLevel: "2",
        };
        const hrEmployees = [
            {
                _id: "789",
                department: "BACK_OFFICE",
                jobTitle: "HR",
            },
        ];

        (EmployeeModel.findById as jest.Mock).mockResolvedValueOnce(employeeData);
        (EmployeeModel.find as jest.Mock).mockResolvedValueOnce([]);

        (EmployeeModel.find as jest.Mock).mockResolvedValueOnce(hrEmployees);

        const result = await getEmployeeId({}, { id });

        expect(result).toEqual(hrEmployees);
        expect(EmployeeModel.find).toHaveBeenCalledWith({
            department: "BACK_OFFICE",
            jobTitle: "HR"
        });
    });

    it('should throw an error if an error occurs during retrieval', async () => {
        const id = "123";
        const mockedError = new Error("Mocked error");

        (EmployeeModel.findById as jest.Mock).mockRejectedValueOnce(mockedError);

        await expect(getEmployeeId({}, { id })).rejects.toThrow(graphqlErrorHandler({ message: "Something went wrong" }, errorTypes.BAD_REQUEST));
    });
});
