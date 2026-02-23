const router = require('express').Router();
router.get('/', (req, res) => {
  res.status(200).json([
    {
      name: 'mobile',
      price: 300000,
    },
    {
      name: 'tv',
      price: 200000,
    },
  ]);
});
module.exports = router;
