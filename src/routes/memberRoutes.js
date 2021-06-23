const express = require('express');
const router = express.Router();
const MemberCtrl =require('../controllers/memberControllers');

router.get('/members',MemberCtrl.fetchMembers);
router.get('/members', MemberCtrl.fetchSingleMember);