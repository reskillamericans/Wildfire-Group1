const Member = require('../models/team_members');
let members = require('./members.json')
exports.seedMember = () =>{
Member.create(...members)  
}, (err, member) => {
    if(err) throw err
    member.save((err, members) => {
        if(err) throw err
        return "New team member page added."
    })
}
