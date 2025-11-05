import request from "supertest";
import app from "../src/app";

describe("Branch Routes", () => {
  let createdId: string;

  it("should create a new branch", async () => {
    const res = await request(app)
    .post("/api/v1/branches")
    .send({ name: "Test Branch", address: "123 Test St", phone: "1234567890" });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
    createdId = res.body.data.id;
  });

  it("should get all branches", async () => {
    const res = await request(app).get("/api/v1/branches");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should get a branch by ID", async () => {
    const res = await request(app).get(`/api/v1/branches/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id", createdId);
  });

  it("should update a branch", async () => {
    const res = await request(app)
      .put(`/api/v1/branches/${createdId}`)
      .send({ phone: "999-999-9999" });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("phone", "999-999-9999");
  });

  it("should delete a branch", async () => {
    const res = await request(app).delete(`/api/v1/branches/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("message", "Branch deleted");
  });
});