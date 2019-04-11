module.exports = server => {
  server.post("/api/auth/register", async (req, res) => {
    res.status(200).send();
  });
};
