const LandingPage = require('../models/landing-page.model.ts');
const Product = require('../models/product.model.ts'); 

export {}

exports.getLandingPageInfo = (req: any, res: any) => {
    LandingPage.find((err: any, landingPageInfo: any) => {

        if(err) return res.status(400).json(err);
        if(!landingPageInfo) return res.status(400).json({msg: 'There is no Landing Page Information!'});
        if(landingPageInfo) {
            console.clear();
            console.log('Getting Landing Page Info: ');
            console.log(landingPageInfo);

            return res.status(200).json({
                msg: 'Landing Page Information',
                landingPageInfo
            })
        }
      })
}

exports.createLandingPage = (req: any, res: any) => {
    LandingPage.find(
        (err: any, pages: any) => {
            
            if(err) {
                res.status(400).json(err);
                return console.log('There was an Error Fing a Landing Pages @ createLandingPage()');
            }

            if(pages.length > 0) {
                res.status(400).json({msg: 'There is already an Existing Landing Page. Cancelling createLandingPage() save. '});
                return console.log('There is already an Existing Landing Page. Cancelling createLandingPage() save. ');
            }

            if(pages.length == 0) {
                let newLandingPage = LandingPage();
                newLandingPage.save(
                    (err: any, page: any) => {
            
                        if(err) return res.status(400).json(err);
                       
                        if(page) {
                            console.log('\n');
                            console.log('Created Landing Page!');
                            console.log(page);
                            return res.status(200).json({
                                msg: 'Create Landing Page Model',
                                page
                            })
                        }
                        
                    }
                )
            }
            
            

        }
    )
}

exports.editWelcomeMessage = (req: any, res: any) => {
    let id = req.body.id;
    let newWelcomeMessage = req.body.newWelcomeMessage;
    console.log(id);
    
    LandingPage.findByIdAndUpdate(
        id,
        { $set: {
            'welcomeMessage': newWelcomeMessage
        } },
        { new: true },
        ( err: any, landingPageInfo: any ) => {

        if(err) return res.status(400).json(err);
        if(!landingPageInfo) return res.status(400).json({msg: 'There is no Landing Page Information!'});
        if(landingPageInfo) {
            console.log('Landing Page Info: ');
            console.log(landingPageInfo);
            return res.status(200).json(
                landingPageInfo
            )
        }
      })
}

exports.editSample = (req: any, res: any) => {
    let id = req.body.id;
    let newSample = req.body.newSample;
    console.log(id);
    
    LandingPage.findByIdAndUpdate(
        id,
        { $set: {
            'sample': newSample
        } },
        { new: true },
        ( err: any, landingPageInfo: any ) => {

        if(err) return res.status(400).json(err);
        if(!landingPageInfo) return res.status(400).json({msg: 'There is no Sample!'});
        if(landingPageInfo) {
            console.log('Landing Page ==: ');
            console.log(landingPageInfo);
            return res.status(200).json(
                landingPageInfo
            )
        }
      })
}

exports.editDescription = (req: any, res: any) => {
    let id = req.body.id;
    let newDescription = req.body.newDescription;
    console.log(id);
    
    LandingPage.findByIdAndUpdate(
        id,
        { $set: {
            'description': newDescription
        } },
        { new: true },
        ( err: any, landingPageInfo: any ) => {

        if(err) return res.status(400).json(err);
        if(!landingPageInfo) return res.status(400).json({msg: 'There is no Landing Page Info!'});
        if(landingPageInfo) {
            console.log('Landing Page ==: ');
            console.log(landingPageInfo);
            return res.status(200).json(
                landingPageInfo
            )
        }
      })
}

exports.editMembershipMessage = (req: any, res: any) => {
    let id = req.body.id;
    let newMembershipMessage = req.body.newMembershipMessage;
    console.log(id);
    
    LandingPage.findByIdAndUpdate(
        id,
        { $set: {
            'membershipMessage': newMembershipMessage
        } },
        { new: true },
        ( err: any, landingPageInfo: any ) => {

        if(err) return res.status(400).json(err);
        if(!landingPageInfo) return res.status(400).json({msg: 'There is no Sample!'});
        if(landingPageInfo) {
            console.log('Landing Page ==: ');
            console.log(landingPageInfo);
            return res.status(200).json(
                landingPageInfo
            )
        }
      })
}
