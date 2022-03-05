const User = require('../models/user.model.ts');

export {}

exports.getAllUsers = (req: any, res: any) => {
    console.log('Getting all Users');

    User.find((err: any, users: any) => {
        console.log(err);
        console.log(users);
        
        return res.status(200).json(users);
    })
}

exports.deleteUser = (req: any, res: any) => {
    console.log('Getting all Users');
    let id = req.body.id;

    User.findOneAndDelete(
        { _id: id },
        { new: true },
        ( err: any, data: any ) => {

        if(err) {
            console.log(err);
            return res.status(400).json(err);
        }

        if(!data) {
            console.log(data);
            return res.status(400).json(err);
        }

        if(data) {

            User.find((err: any, users: any) => {
                if(err) {
                    return res.status(400).json(err);
                }

                if(!data) {
                    console.log(data);
                    return res.status(400).json('There were no users After delete?');
                }

                if(data) {

                    // TODO: Send User Email letting them know their account has been delete.
                    // Maybe add something else here.
                    console.log({
                        msg: `${id} user deleted.`,
                        userDeleted: {
                            fullName: data.fullName,
                            email: data.email,
                            _id: data._id
                        },
                        remainingUsers: users
                    });
                    
                    return res.status(200).json({
                    msg: `${id} user deleted.`,
                    userDeleted: {
                        fullName: data.fullName,
                        email: data.email,
                        _id: data._id
                    },
                    remainingUsers: users
                    });

                }

            })
        }
        
    })
}