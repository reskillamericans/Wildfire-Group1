const express = require('express');
const router = express.Router();
const MemberCtrl =require('../controllers/memberControllers');

router.get('/about-us', MemberCtrl.fetchMembers);
//router.get('/members/:id', MemberCtrl.fetchSingleMember);
module.exports = router;