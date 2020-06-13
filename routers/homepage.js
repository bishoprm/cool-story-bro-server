const { Router } = require("express");
const Homepage = require("../models").homepage;
const Story = require("../models").story;
const router = new Router();
const auth = require("../auth/middleware");

// update homepage
router.patch("/:id", auth, async (req, res) => {
  const homepage = await Homepage.findByPk(req.params.id);
  if (!homepage.userId === req.user.id) {
    return res
      .status(403)
      .send({ message: "you're not authorized to update this homepage" });
  }
  const { title, description, backgroundColor, color } = req.body;
  await homepage.update({ title, description, backgroundColor, color });
  return res.status(200).send({ homepage });
});
//delete a story
// also possible: await Model.destroy({ where: id (for example) });

router.delete("/:homepageId/stories/:storyId", async (req, res, next) => {
  const { storyId } = req.params;
  try {
    const result = await Story.destroy({ where: { id: storyId } });

    console.log("story deleted", result);
    res.send({ message: "story deleted" });
  } catch (e) {
    next(e);
  }
});
// other option
// router.delete("/:homepageId/stories/:storyId", async (req, res, next) => {
//   const { storyId } = req.params;
//   try {
//     const story = await Story.findByPk(storyId);
//     console.log("DELETING");
//     if (!story) {
//       return res.status(404).send("Story not found");
//     }

//     console.log("The story exists");
//     const result = await story.destroy();

//     console.log("story deleted", result);
//     res.json({ storyId });
//   } catch (e) {
//     next(e);
//   }
// });

// post new story
router.post("/:id/stories", auth, async (req, res) => {
  const homepage = await Homepage.findByPk(req.params.id);
  console.log("Whats homepage?", homepage);
  if (homepage === null) {
    return res.status(404).send({ message: "This homepage does not exist" });
  }
  if (!homepage.userId === req.user.id) {
    return res.status(403).send({ message: "This homepage does not exist" });
  }
  const { name, imageUrl, content } = req.body;
  if (!name) {
    return res.status(400).send({ message: "the story must have a name" });
  }
  const story = await Story.create({
    name,
    imageUrl,
    content,
    homepageId: homepage.id,
  });
  return res.status(201).send({ message: "story created", story });
});

// get all homepages
router.get("/", async (req, res, next) => {
  const homepage = await Homepage.findAll();
  res.json(homepage);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).send({ message: "Homepage id is not a number" });
    }

    const homepage = await Homepage.findByPk(id, {
      include: [Story],
      order: [[Story, "createdAt", "DESC"]],
    });

    if (homepage === null) {
      return res.status(404).send({ message: "Homepage not found" });
    }

    res.status(200).send({ message: "ok", homepage });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
