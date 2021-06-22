const Member = require('../models/team_members');
let {members} = require('./members.json');
exports.seedMember = () =>{
    Member.find({}, (err, member)=>{
        if(err) throw err
if (member.length===0){
    Member.create(...members, (err, newMember) => {
    if(err) throw err
   console.log("New member added.") })
}})}
