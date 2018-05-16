class View{
	constructor(){
		
	}
	static viewAddFailed(data){
		console.log('data gagal dimasukkan')
	}
	static viewUpdateFailed(data){
		console.log('data gagal di update id/name tidak ditemukan')
	}
	static viewDeleteFailed(data){
		console.log('gagal menghapus data')
	}
	static addContact(data){
		console.log(`Berhasil menambahkan data ${data} kedalam contact`)	
	}
	static updateContact(data){
		console.log(`Berhasil update data ${data} dari contact`)
	}
	static deleteContact(id){
		console.log(`Berhasil menghapus data`)
	}
	static addGroup(data){
		console.log(`Berhasil membuat ${data} sebagai group baru`)
	}
}

module.exports = View