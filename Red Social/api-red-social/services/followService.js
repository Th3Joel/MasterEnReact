const Follow = require("../model/follow");
const followUserIds = async(identityUserId) =>{
	//Sacar info de swguimineto
	let following = await Follow.find({"user":identityUserId})
								//Quiero que no me devuelva esto datos
								.select({"_id":0,"__v":0, "user":0,"created_at":0});
	let followers = await Follow.find({"followed":identityUserId})
								//Quiero que no me devuelva esto datos
								.select({"_id":0,"__v":0, "followed":0,"created_at":0});
		//Procesar array indetifiadores

		let followingClean = [];

		following.forEach(fo => {
			followingClean.push(fo.followed)
		});

		let followersClean = [];

		followers.forEach(fo => {
			followersClean.push(fo.user)
		});

		return {
			following:followingClean,
			followers:followersClean
		}


}

//Sigo a este usuario
const followThisUser = async(identityUserId,profileID) => {
//Sacar info de swguimineto
	let following = await Follow.findOne({"user":identityUserId,"followed":profileID}) //sacar solo un valor y saber si lo sigo a el
								
	let follower = await Follow.findOne({"user":profileID,"followed":identityUserId})//sacar solo un valor y saber si el me sigue
								


		return {
			following,
			follower
		}


}

module.exports = {
	followUserIds,
	followThisUser
}