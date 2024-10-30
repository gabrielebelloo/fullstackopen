const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const biggerList = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234e27f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422ap01b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 6,
      __v: 0,
    },
    {
      _id: "5a422ap01b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Gabriele",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 6,
      __v: 0,
    },
    {
      _id: "5a422ap01b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Gabriele",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 6,
      __v: 0,
    },
    {
      _id: "5a422ap01b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Gabriele",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 6,
      __v: 0,
    },
    {
      _id: "5a422ap01b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Gabriele",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 6,
      __v: 0,
    },
  ];

  test("of empty list is null", () => {
    const result = listHelper.mostLikes([]);
    assert.deepStrictEqual(result, null);
  });

  test("when list has only one blog equals the author of the blog with the likes", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, {author: "Edsger W. Dijkstra", likes: 5});
  });

  test("of a bigger list equals the author with most blogs", () => {
    const result = listHelper.mostLikes(biggerList);
    assert.deepStrictEqual(result, {author: "Gabriele", likes: 24});
  });
});
