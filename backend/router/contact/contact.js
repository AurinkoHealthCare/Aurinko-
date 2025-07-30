const express=require('express');
const router=express.Router();
const {contactController,getContacts}=require('../../controller/contact/contactcontroller')

router.post('/contact',contactController)
router.get('/allcontacts',getContacts)

module.exports=router