const mongoose = require("mongoose");

const GetConversationsService = async (req, res, ConversationModel) => {

      try {

       //const loginUserId=req.headers.id;
       const loginUserId=req.params['id'];
       const ObjectId = mongoose.Types.ObjectId;

       const data = await ConversationModel.aggregate([
                       {$match: {members: { $in: [ new ObjectId(loginUserId)] }}},
                       {$sort : { updatedAt: -1 }},
                       {$lookup: {from: "users", localField:"members", foreignField: "_id", as: "Members" }}
                     ]);

        res.status(200).json({status:"success", data:data});

    }catch(error) {
      res.status(500).json({status:"fail", data:error.toString()});
   }

}


module.exports = GetConversationsService