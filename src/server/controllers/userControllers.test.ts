import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import connectDatabase from "../../database/connectDatabase";
import { type UserStructure } from "../types";
import request from "supertest";
import app from "..";
import { User } from "../../database/models/User";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST '/user/login' endpoint", () => {
  const mockUser: UserStructure = {
    username: "User",
    password: "123",
    image: "image.png",
  };

  describe("When it receives a request with username 'User' and password '123'", () => {
    beforeAll(async () => {
      await User.create(mockUser);
    });

    test("Then it should respond with status code 200 and a token", async () => {
      const endpoint = "/user/login";
      const expectedStatusCode = 200;
      const expectedProperty = "token";
      jwt.sign = jest.fn().mockImplementation(() => ({
        token: "abc",
      }));

      const response = await request(app)
        .post(endpoint)
        .send(mockUser)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty(expectedProperty);
    });
  });

  describe("When it receives a request with username 'User' and incorrect password '124'", () => {
    beforeAll(async () => {
      await User.create(mockUser);
    });

    test("Then it should respond with status code 401 and error message 'Wrong credentials'", async () => {
      const mockUserWrongPassword: UserStructure = {
        username: "User",
        password: "124",
        image: "image.png",
      };
      const endpoint = "/user/login";
      const expectedStatusCode = 401;
      const expectedErrorMessage = '{"error":"Wrong credentials"}';

      const response = await request(app)
        .post(endpoint)
        .send(mockUserWrongPassword)
        .expect(expectedStatusCode);

      expect(response.text).toStrictEqual(expectedErrorMessage);
    });
  });

  describe("When it receives a request with username 'User' and password '123' from a user that doesn't exist in the database", () => {
    test("Then it should respond with status code 401 and error message 'Wrong credentials'", async () => {
      const endpoint = "/user/login";
      const expectedStatusCode = 401;
      const expectedErrorMessage = '{"error":"Wrong credentials"}';

      const response = await request(app)
        .post(endpoint)
        .send(mockUser)
        .expect(expectedStatusCode);

      expect(response.text).toStrictEqual(expectedErrorMessage);
    });
  });
});
