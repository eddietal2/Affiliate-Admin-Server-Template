// const Report = require('../models/report.model.ts');

export {}

exports.getReports = (req: any, res: any) => {
    console.log('Getting all Reports');
    return res.status(200).json({msg: 'Reports!'});
}
