const {Schema,model} = require("mongoose");
//Usado para la paginacion de resultados
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = Schema({
	name: {
		type: String,
		required: true
	},
	bio:String,
	surname: String,
	nick: {
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	role: {
		type:String,
		default: "role_user"
	},
	imagen: {
		type:String,
		default: "default.png"
	},
	create_at: {
		type:Date,
		default: Date.now
	}
});

//Se agrega para la paginacion
userSchema.plugin(mongoosePaginate);

module.exports = model("User",userSchema, "users");
											//Collecion: users