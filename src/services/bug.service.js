import Axios from "axios";
import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

var axios = Axios.create({
  withCredentials: true,
});

const STORAGE_KEY = "bugDB";
const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? "/api/bug/"
    : "//localhost:3030/api/bug/";

export const bugService = {
  query,
  getById,
  save,
  remove,
};

async function query(filterBy = {}) {
  try {
    const { data: bugs } = await axios.get(BASE_URL, { params: filterBy });
    return bugs;
  } catch (err) {
    console.log({ err });
    throw err;
  }
}

async function getById(bugId) {
  try {
    const { data: bug } = await axios.get(`${BASE_URL}${bugId}`);
    return bug;
  } catch (err) {
    console.log({ err });
    throw err;
  }
}

async function remove(bugId) {
  try {
    await axios.delete(`${BASE_URL}${bugId}`);
  } catch (err) {
    console.log({ err });
    throw err;
  }
}

async function save(bug) {
  try {
    const httpMethod = bug._id ? "put" : "post";
    const url = bug._id ? BASE_URL + bug._id : BASE_URL;
    const { data: savedBug } = await axios[httpMethod](url, bug);
    return savedBug;
  } catch (err) {
    console.log({ err });
    throw err;
  }
}
