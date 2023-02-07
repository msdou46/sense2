// src/__tests__/integration/auth.integration.spec.js

const supertest = require("supertest");
const {app} = require("../../../app");
const { sequelize } = require("../../sequelize/models/index");