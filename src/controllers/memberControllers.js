const Member = require('../models/team_members');

exports.fetchMembers = (req, res) => {
    let conditions ={};
    if(req.query.role){
        conditions.role = req.query.role
    }
    console.log(conditions);
    console.log(req.query);
Member.find(conditions, (err, members) => {
    if (err) {
        return res.status(500).json({ message:err })
    } else {
        return res.status(200).json({ members })
    }
})
exports.fetchSingleMember = (req, res) => {
    Member.findById(req.params.id, (err, member) =>{
        if (err){
            return res.status(500).json({ message: err })
        } else if (!member){
            return res.status(404).json({ message: "member not found"})
        } else{
            return res.status(200).json({ member })
        }
    })
}}