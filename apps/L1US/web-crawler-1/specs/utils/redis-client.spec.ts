/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
// ARRANGE
jest.mock("ioredis", () => {
  return jest.fn(() => {
    const events: { [key: string]: Array<(..._args: any[]) => void> } = {};
    return {
      on: jest.fn((event, callback) => {
        if (!events[event]) {
          events[event] = [];
        }
        events[event].push(callback);
        if (event === "connect") {
          callback();
        }
      }),
      emit: jest.fn((event, ..._args) => {
        if (events[event]) {
          events[event].forEach(cb => cb(..._args));
        }
      }),
      quit: jest.fn(),
    };
  });
})

import Redis from "ioredis";
import { connectToRedis } from "../../src/utils/redis-client";

describe("connectToRedis", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {/* intentionally empty */});
  });

  // ACT & ASSERT
  it("should create a Redis client instance", () => {
    connectToRedis();
    expect(Redis).toHaveBeenCalledTimes(1);
  });

  it("should log an error when Redis emits an error event", () => {
    // ARRANGE
    const client = connectToRedis();
    const mockError = new Error("Mock Redis Error");
    // ACT & ASSERT
    client.emit("error", mockError);
    expect(console.error).toHaveBeenCalledWith("Redis Client Error: ", mockError.message);
  });
});
