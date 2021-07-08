const Member = require('../models/team_members');

exports.fetchMembers = async (req, res, next) => {
    try {
        const members = await Member.find({});

        res.status(200).render("about-us",{members})

    } catch(err) {
        next(err)
    }

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