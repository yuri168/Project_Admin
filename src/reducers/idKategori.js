const initial_state = 0

export default (state = initial_state, action) =>{
    switch(action.type){
        
        case 'idKategori':
            return action.payload; 

        default:
            return state; 
    }
}