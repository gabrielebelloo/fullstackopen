const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("most liked blog", () => {
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
  ];

  test("of empty list is null", () => {
    const result = listHelper.favoriteBlog([]);
    assert.deepStrictEqual(result, null);
  });

  test("when list has only one blog equals the same blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    const blog = listWithOneBlog[0];
    delete blog._id;
    delete blog.url;
    delete blog.__v;
    assert.deepStrictEqual(result, blog);
  });

  test("of a bigger list is found right", () => {
    const result = listHelper.favoriteBlog(biggerList);
    assert.deepStrictEqual(result, {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 6
    });
  });
  
});
