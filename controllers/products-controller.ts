const Product = require('../models/product.model.ts');
const LandingPage = require('../models/landing-page.model.ts');


export {}

exports.getAllProducts = (req: any, res: any) => {
    Product.find((err: any, products: any) => {
        console.log('Getting Products...')
        return res.status(200).json(products)
      })
}

exports.getFeaturedProducts = (req: any, res: any ) => {
    Product.find((err: any, products: any) => {
        console.log('Getting Featured Products...');
        let featuredProducts = products.filter((product: any) => {
            return product.featured == true;
        })
        return res.status(200).json(
            featuredProducts)
      })
}

exports.featureProduct = (req: any, res: any) => {
    console.log(req.body);

    let id = req.body._id;

    // Check if there are already 6 featured Products
    Product.find((err: any, products: any) => {
        console.log('Getting Featured Products...');

        let featuredProducts: any[] = [];
        products.filter((product: any) => {
            console.log(product.featured);
            
             if(product.featured) {
                featuredProducts.push(product._id)
             }
        })

        if(err) {
            console.log(err);
            return res.status(400).json(err);
        }

        console.log(featuredProducts);
        
        
        if(featuredProducts.length >= 3) {
            console.log('There are 3 or more Featured Products!');
            return res.status(400).json({msg: 'There are already 3 Featured Products'})
        }
    
        // Update that Product's featured property
        Product.findOneAndUpdate(
            {_id: id},
            {$set: {featured: true}},
            {new: true},
            (err: any, product: any) => {
                if(err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
                if(!products) {
                    console.log('No Product with that ID');
                    return res.status(400).json({msg: 'No Product with that ID'});
                }
                if(products) {
                    console.log('Successfully Featured Product!');
                    LandingPage.findByIdAndUpdate(
                        '622d13977c530867d6d8d86b',
                        {$push: {featuredProducts: product._id}},
                        {new: true},
                        (err: any, page: any) => {
                            if(err) throw err
                            if(page) {
                                return res.status(200).json({msg: 'Successfully Featured Product!'});
                            }
                        }
                    )
                    
                }
            }
        )

      })

}
exports.unfeatureProduct = (req: any, res: any) => {
    console.log(req.body);

    let id = req.body._id;

    Product.findOneAndUpdate(
        {_id: id},
        {$set: {featured: false}},
        {new: true},
        (err: any, product: any) => {
            if(err) {
                console.log(err);
                return res.status(400).json(err);
            }
            if(!product) {
                console.log('No Product with that ID');
                return res.status(400).json({msg: 'No Product with that ID'});
            }
            if(product) {
                console.log('Successfully Unfeatured Product!');
                LandingPage.findByIdAndUpdate(
                    '622d13977c530867d6d8d86b',
                    {$pull: {featuredProducts:  product._id}},
                    {new: true},
                    (err: any, page: any) => {
                        if(err) throw err
                        if(page) {
                            return res.status(200).json({msg: 'Successfully Unfeatured Product!'});
                        }
                    }
                )
            }
        }
    )

}


exports.addProduct = (req: any, res: any) => {

    console.log('Adding Product');
    let title = req.body.title;    
    let apiID = req.body.apiID;    
    let description = req.body.description;    
    let category = req.body.category;    
    let duration = req.body.duration;    
    let price = req.body.price;    
    let sample = req.body.sample;

    let newProduct = Product({
        title,
        apiID,
        datePosted: Date.now(),
        description,
        category,
        duration,
        price,
        sample
    })

    newProduct.save(
        (err: any, product: any) => {
          if (err) {
              console.log(err)
              return res.status(400).json({ msg: err });
          }
          if (!product) {
              console.log('There was no product saved!')
              return res.status(400).json({ msg: 'There was no product saved!' });
          }
          
          Product.find(
              (err: any, products: any) => {
                  if(err) {
                      return req.status(400).json(err);
                  }

                  if(!products) {
                    return req.status(400).json({msg: "No products!"});
                  }

                  return res.status(200).json(products)
              }
          )
      });

}

exports.editProduct = (req: any, res: any) => {

    console.log('Editting Product');

    let id = req.body.id;
    let title = req.body.title;
    let apiID = req.body.apiID;
    let description = req.body.description;    
    let category = req.body.category;    
    let duration = req.body.duration;    
    let price = req.body.price;    
    let sample = req.body.sample;

    Product.findOneAndUpdate(
        {_id: id},
        { $set:
          { 'title': title,
            'apiID': apiID,
            'description': description,
            'category': category,
            'duration': duration,
            'price': price,
            'sample': sample,
          }
        },
        (err: any, product: any) => {
          if(err) {
            console.log(err);
            return res.status(400).json(err)
          }
          if(!product) return res.status(400).json({msg: 'There was no product with that id'})
          console.log(`Editing _id ${id}`)
          
          if(product) {
          
            Product.find(
                (err: any, products: any) => {
                    if(err) {
                        return req.status(400).json(err);
                    }
  
                    if(!products) {
                      return req.status(400).json({msg: "No products!"});
                    }
  
                    return res.status(200).json(products)
                }
            )
          }
        })
    

}

exports.deleteProduct = (req: any, res: any) => {
    console.log('Deleting Product');
    let id = req.body.id;

    Product.findOneAndDelete(
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

            Product.find((err: any, products: any) => {
                if(err) {
                    return res.status(400).json(err);
                }

                if(!data) {
                    console.log(data);
                    return res.status(400).json('There were no products After delete?');
                }

                if(data) {

                    // Maybe Add to Archieve of past products?
                    console.log({
                        msg: `${id} prodduct deleted.`,
                        productDeleted: {
                            email: data.title,
                            _id: data._id
                        },
                        remainingProducts: products
                    });
                    
                    return res.status(200).json({
                    msg: `${id} prodduct deleted.`,
                    productDeleted: {
                        email: data.title,
                        _id: data._id
                    },
                    remainingProducts: products
                    });

                }

            })
        }
        
    })

}