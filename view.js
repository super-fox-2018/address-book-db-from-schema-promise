class View{
	constructor(){
		
	}
	static viewAddFailed(data){
		console.log('data gagal dimasukkan')
	}
	static viewUpdateFailed(data){
		console.log('data gagal di update')
	}
	static addContact(data){
		console.log(`Berhasil menambahkan data ${data} kedalam contact`)	
	}
	static addGroup(data){
		console.log(`Berhasil membuat ${data} sebagai group baru`)
	}
}

module.exports = View