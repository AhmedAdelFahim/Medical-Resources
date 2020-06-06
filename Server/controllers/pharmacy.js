const Pharmacy = require('../models/pharmacy')

const addPharmacy = async (req,res) => {
    // console.log(req.body)
    const {userId} = req;
    const {body:{  name, location, phoneNumbers, delivery, maxTimeLimit }} = req
    try {
        const pharmacy = await Pharmacy.create({admin_id:userId, name, location, phoneNumbers, delivery, maxTimeLimit})
        res.status(201).send(pharmacy)
    } catch (e) {
        // console.log(e.message)
        res.status(500).send(e)
    }
}

const getPharmacyProfile = async (req, res) => {
    const {userId} = req;
    try {
        const pharmacy = await Pharmacy.findOne({ admin_id: userId})
        if(!pharmacy) {
            return res.status(404).end()
        }
        res.status(200).send(pharmacy)
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const updatePharmacy = async (req, res) => {
    const {params:{id}} = req;
    const {userId} = req;
    // const {body:{  name, location, phoneNumbers, delivery }} = req
    const updatedKeys = Object.keys(req.body);
    try {
        const pharmacy = await Pharmacy.findOne({_id:id, admin_id: userId})
        if(!pharmacy) {
            return res.status(404).end()
        }
        updatedKeys.forEach((key)=>{
            if(key === 'admin_id') {
                return;
            }
            pharmacy[key] = req.body[key]
        })
        await pharmacy.save()
        res.status(200).send(pharmacy)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }

}

module.exports = {
    addPharmacy,
    getPharmacyProfile,
    updatePharmacy
}